export const activateAutocomplete = (inputSelector: string): void => {
  const input = document.querySelector<HTMLInputElement>(inputSelector);
  if (input !== null) {
    configureAutocomplete(input);
    document.addEventListener('click', function (e: MouseEvent) {
      removeAutoCompletes(e.target as Element, input);
    });
  }
};

function configureAutocomplete(input: HTMLInputElement) {
  let currentFocus: number;

  input.addEventListener('input', function () {
    console.log('input');
    performAutoSuggestion(input);
  });
  input.addEventListener('focusin', function () {
    console.log('focusin');
    performAutoSuggestion(input);
  });
  input.addEventListener('keydown', function (e) {
    console.log('keydown');
    const autocompleteListElement = document.getElementById(this.id + 'autocomplete-list');
    if (autocompleteListElement) {
      const autocompleteListChildrenElements = autocompleteListElement.getElementsByTagName('div');

      if (e.keyCode == 40) {
        currentFocus++;
        addActive(autocompleteListChildrenElements, currentFocus);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(autocompleteListChildrenElements, currentFocus);
      } else if (e.keyCode == 13) {
        if (currentFocus > -1) {
          if (autocompleteListChildrenElements)
            autocompleteListChildrenElements[currentFocus].click();
        }
      }
    }
  });
}

function removeAutoCompletes(clickedElement: Element, input: HTMLInputElement) {
  const autocompleteItems = document.getElementsByClassName('autocomplete-items');
  for (let i = 0; i < autocompleteItems?.length; i++) {
    const autocompleteItem = autocompleteItems[i];
    if (clickedElement != autocompleteItem && clickedElement != input) {
      autocompleteItem.parentNode.removeChild(autocompleteItem);
    }
  }
}

async function triggerQuerySuggestionCall(input: HTMLInputElement) {
  const rawResponse = await fetch(
    'https://ss984481-oi64ob1t-us-east-1-aws.searchstax.com/solr/sitecore1022-820-suggester/emsuggest?q=' +
      input.value +
      '&&language=en',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic YXBwODIwLWFwaTpLb25hYm9zITIz',
      },
    }
  );
  const content = await rawResponse.json();
  const completions = content?.suggest?.studio_suggestor_en?.spo?.suggestions;
  return completions;
}

function performAutoSuggestion(input: HTMLInputElement) {
  const autoCompleteListDiv = document.createElement('DIV');

  //removeAutoCompletes(input, searchUrlInputCssSelector, searchButtonCssSelector);
  autoCompleteListDiv.setAttribute('id', 'autocomplete-list');
  autoCompleteListDiv.setAttribute('class', 'autocomplete-items');

  triggerQuerySuggestionCall(input).then((completions) => {
    if (completions?.length > 0) {
      const autoCompleteDiv = document.getElementById('autocomplete-list');
      if (autoCompleteDiv !== null) {
        autoCompleteDiv.remove();
      }
      input.parentNode.appendChild(autoCompleteListDiv);
    }
    for (let i = 0; i < completions?.length; i++) {
      const completionTerm = completions[i].term as string;
      const completionTermNoHtmlTags = completionTerm.replace('<b>', '').replace('</b>', '');

      const b = document.createElement('DIV');
      //.innerHTML += getHighlightedSuggestion(completionTerm, input.value);
      b.innerHTML += completionTerm;
      b.innerHTML += "<input type='hidden' value='" + completionTermNoHtmlTags + "'>";
      b.addEventListener('click', function () {
        input.value = this.getElementsByTagName('input')[0].value;
        const searchUrl = '/search';
        const query = input.value;
        window.location.href = searchUrl + '?searchStudioQuery=' + query;
      });
      autoCompleteListDiv.appendChild(b);
    }
  });
}

function addActive(items: HTMLCollectionOf<HTMLDivElement>, currentFocus: number) {
  if (!items) return false;
  removeActive(items);
  if (currentFocus >= items?.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = items?.length - 1;
  items[currentFocus].classList.add('autocomplete-active');
  return true;
}

function removeActive(items: HTMLCollectionOf<HTMLDivElement>) {
  for (let i = 0; i < items?.length; i++) {
    items[i].classList.remove('autocomplete-active');
  }
}
