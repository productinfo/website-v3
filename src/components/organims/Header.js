import React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'gatsby';
import { rem, rgba } from 'polished';
import Button from '../atoms/Button';
import NavButton from '../atoms/NavButton';
import Wrapper from '../layout/Wrapper';
import * as color from '../../styles/colors';
import { mqNavMobile, mqNavDesktop } from '../../styles/breackpoint';
import * as font from '../../styles/fonts.js';
import * as transition from '../../styles/transitions';
import styled from 'react-emotion';
import { isMobile, CustomView } from 'react-device-detect';

const DownloadButton = ({ theme, isFloatted, url, text, trackingClass }) => (
  <Button
    theme={theme === 'dark' || isFloatted ? 'primary' : 'light'}
    to={url}
    className={cx(
      'header-nav-button',
      trackingClass,
      css({
        [mqNavMobile]: {
          marginTop: rem(20),
        },
      }),
    )}
  >
    {text}
  </Button>
);

const Section = styled('header')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 666;
  transition: background-color 0.2s ${transition.base},
    border-color 0.2s ${transition.base};
`;

const linkType = type => {
  switch (type) {
    case 'external':
      return 'a';
    default:
      return Link;
  }
};

const relType = type => {
  switch (type) {
    case 'external':
      return 'noreferrer';
    default:
      return '';
  }
};

const NavLink = ({ element, theme, isFloatted, ...props }) => {
  props.href = props.to;
  return React.createElement(element, {
    ...props,
    className: css({
      position: 'relative',
      overflow: 'hidden',
      display: 'block',
      fontWeight: font.weightMedium,
      color: theme === 'dark' || isFloatted ? color.neutral : color.light,
      transition: `opacity 0.3s ${transition.base}`,
      padding: `${rem(15)} ${rem(20)}`,
      [mqNavDesktop]: {
        padding: rem(10),
      },
      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: color.clr4,
        transform: 'translateX(-110%)',
        transition: `transform 0.2s ${transition.base}`,
      },
      '&:active, &:hover, &:focus': {
        color: theme === 'dark' || isFloatted ? color.neutral : color.light,
        '&:after': {
          transform: 'translateX(0%)',
        },
      },
    }),
  });
};

const Header = ({
  theme,
  header,
  download,
  toggleNavMobile,
  navMobileOpen,
  isFloatted,
  ...rest
}) => {
  const DATA = header.data;
  const DOWNLOAD = download.data;
  return (
    <Section
      id="header"
      className={cx(
        'header',
        navMobileOpen ? 'navMobile-open' : 'navMobile-close',
        css({
          backgroundColor: isFloatted
            ? 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
          backdropFilter: isFloatted ? 'blur(10px)' : 'none',
          borderBottom: `1px solid ${
            isFloatted ? rgba(color.clr1, 0.64) : 'transparent'
          }`,
          [mqNavMobile]: {
            height: navMobileOpen ? '100vh' : 'auto',
            background: navMobileOpen
              ? color.light
              : isFloatted
              ? 'rgba(255, 255, 255, 0.95)'
              : 'transparent',
          },
        }),
      )}
      {...rest}
    >
      <Wrapper
        className={css({
          [mqNavMobile]: {
            paddingBottom: rem(20),
          },
          [mqNavDesktop]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: rem(75),
          },
        })}
      >
        <h1
          className={css({
            [mqNavMobile]: {
              padding: `${rem(24)} 0 ${rem(3)}`,
            },
          })}
        >
          <Link to="/">
            {DATA.logo.url ? (
              <img
                src={DATA.logo.url}
                alt={DATA.logo_alt_text}
                width={DATA.logo.dimensions.width || null}
                height={DATA.logo.dimensions.height || null}
                className={cx(
                  'header-logo',
                  css({
                    filter:
                      theme === 'dark' || isFloatted
                        ? 'none'
                        : 'brightness(100)',
                  }),
                )}
              />
            ) : (
              <div>Station</div>
            )}
          </Link>
        </h1>
        <div>
          <NavButton onClick={toggleNavMobile} open={navMobileOpen} />
        </div>
        <div
          className={cx(
            'header-nav',
            css({
              [mqNavMobile]: {
                display: navMobileOpen ? 'block' : 'none',
                textAlign: 'center',
                padding: `${rem(40)} 0`,
              },
              [mqNavDesktop]: {
                display: 'flex',
                alignItems: 'center',
                '> *:not(:first-child)': {
                  marginLeft: rem(30),
                },
              },
            }),
          )}
        >
          {DATA.links &&
            DATA.links.map((link, index) => (
              <NavLink
                key={`nav-link-${index}`}
                theme={theme}
                element={linkType(link.type)}
                to={link.url}
                isFloatted={isFloatted}
                target={link.type === 'external' ? '_blank' : null}
                rel={link.type === 'external' ? 'noreferrer' : null}
              >
                {link.text}
              </NavLink>
            ))}
          {DATA.download_text && DOWNLOAD.button_url && (
            <div>
              <div>
                <CustomView condition={!isMobile}>
                  <DownloadButton
                    theme={theme}
                    isFloatted={isFloatted}
                    url={DOWNLOAD.button_url.url}
                    text={DATA.download_text}
                    trackingClass={DATA.download_tracking_class}
                  />
                </CustomView>
              </div>
              <div>
                <CustomView condition={isMobile}>
                  <DownloadButton
                    theme={theme}
                    isFloatted={isFloatted}
                    url={DOWNLOAD.button_url_mobile.url}
                    text={DATA.download_text}
                    trackingClass={DATA.download_tracking_class}
                  />
                </CustomView>
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    </Section>
  );
};

export default Header;
