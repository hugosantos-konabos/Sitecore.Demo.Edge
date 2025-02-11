import Link from 'next/link';
import React, { useState, KeyboardEvent, useEffect } from 'react';
import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { isCommerceEnabled } from '../../helpers/CommerceHelper';
import { activateAutocomplete } from '../../helpers/GlobalSearchBox';

export type MainNavigationWithSearchProps = ComponentProps & {
  fields: {
    data: {
      item: {
        headerLogo: {
          jsonValue: ImageField;
          alt: string;
        };
      };
      links: {
        children: {
          results: [
            {
              displayName: string;
              field: {
                jsonValue: {
                  value: {
                    anchor: string;
                    href: string;
                    linktype: string;
                    target: string;
                    text: string;
                    url: string;
                  };
                };
              };
            }
          ];
        };
      };
    };
  };
};

const MainNavigationWithSearch = (props: MainNavigationWithSearchProps): JSX.Element => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [autoSuggestEnabled, setAutoSuggestEnabled] = useState(false);
  const [query, setQuery] = useState('');

  const searchBoxKeyUp = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      window.location.href = '/search?searchStudioQuery=' + query;
    }
  };

  const shopLink = isCommerceEnabled && (
    <li className="text-menu-item">
      <Link href="/shop">
        <a>Shop</a>
      </Link>
    </li>
  );

  useEffect(() => {
    if (!autoSuggestEnabled) {
      activateAutocomplete('#searchfieldtop');
      setAutoSuggestEnabled(true);
    }
  }, [autoSuggestEnabled]);

  return (
    <nav className="main-navigation">
      <div className="navigation-content">
        <div className="controls-container">
          <Link href="/">
            <a className="logo-link">
              <Image
                field={props.fields.data.item.headerLogo.jsonValue}
                alt={props.fields.data.item.headerLogo.alt}
              />
            </a>
          </Link>
          <button
            className="items-toggle"
            aria-label="open menu"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className={'items-container' + (navbarOpen ? ' opened' : ' closed')}>
          <ul>
            {props.fields?.data?.links?.children?.results?.map((item, index) => (
              <li className="text-menu-item" key={index}>
                <Link href={item.field?.jsonValue?.value?.href ?? '#'} prefetch={false}>
                  <a>{item.displayName}</a>
                </Link>
              </li>
            ))}
            {shopLink}
            <li className="button-menu-item">
              <Link href="/tickets">
                <a className="btn-main">Book Tickets</a>
              </Link>
            </li>
            <div className="global-search-wrapper">
              <input
                type="text"
                id="searchfieldtop"
                placeholder="Type the search here"
                aria-label="Search field"
                className="global-search-box"
                onKeyUp={(event) => searchBoxKeyUp(event)}
                onChange={(event) => setQuery(event.target.value)}
              ></input>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigationWithSearch;
