import React from 'react';
import { IconWrapper, OverlayIconWrapper } from './TopBarComponent';
import {
    Container,
    SubContainer,
    QuickMenuContainer,
    Wrapper,
    MenuTitle,
    MenuList,
    MenuItem,
    ItemLink,
    TransporterIcon,
    AccessMenuExpend,
    MenuExpend,
    IconContainer,
} from './SideBarComponent';

import { ArrowTop } from './icon';
import { createImage } from '../../helper';
import sideBarData from './sideBarData';

function SideBar() {
    function handleOpenMenu() {
        const openIcons = document.getElementsByClassName('openIcon');
        const closeIcons = document.getElementsByClassName('closeIcon');
        const menuExpand = document.getElementsByClassName('menuExpand');
        const menuItems = document.getElementsByClassName('menuItem');

        for (let item of menuItems) {
            item.addEventListener('click', function () {
                for (let item of menuItems) {
                    item.classList.remove('active');
                }

                this.classList.add('active');
            });
        }

        for (let icon of openIcons) {
            icon.classList.add('active');

            icon.addEventListener('click', function () {
                const index = Math.abs(this.dataset.index);

                this.childNodes[0].classList.add('rotate1');
                menuExpand[index].classList.add('open');
                menuExpand[index].childNodes[0].classList.add('open');

                const self = this;

                setTimeout(function () {
                    self.classList.remove('active');
                    closeIcons[index].classList.toggle('active', true);
                    self.childNodes[0].classList.remove('rotate1');
                }, 200);
            });
        }

        for (let icon of closeIcons) {
            icon.addEventListener('click', function () {
                const index = Math.abs(this.dataset.index);
                this.childNodes[0].classList.add('rotate2');
                menuExpand[index].childNodes[0].classList.remove('open');
                const self = this;

                setTimeout(function () {
                    openIcons[index].classList.toggle('active', true);
                    self.classList.remove('active');
                    menuExpand[index].classList.remove('open');
                    self.childNodes[0].classList.remove('rotate2');
                }, 200);
            });
        }
    }

    console.log('sidebar rendering...');

    React.useEffect(() => {
        handleOpenMenu();
    }, []);

    return (
        <Container>
            <SubContainer>
                {sideBarData.map(({ iconHeader, headerTitle, listItem }, index) => (
                    <QuickMenuContainer key={iconHeader + '-' + headerTitle + '-' + listItem[0]}>
                        <AccessMenuExpend>
                            <IconWrapper noMargin>
                                <TransporterIcon src={iconHeader} />
                            </IconWrapper>

                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <MenuTitle>{headerTitle}</MenuTitle>

                                <IconContainer>
                                    <OverlayIconWrapper className="openIcon" data-index={index}>
                                        <ArrowTop className="svgIcon1" />
                                    </OverlayIconWrapper>
                                    <OverlayIconWrapper className="closeIcon" data-index={index}>
                                        <ArrowTop className="svgIcon2" />
                                    </OverlayIconWrapper>
                                </IconContainer>
                            </div>
                        </AccessMenuExpend>

                        <MenuExpend className="menuExpand">
                            <MenuList className="menuList">
                                {listItem.map(({ itemName, path }) => (
                                    <MenuItem
                                        key={itemName + headerTitle}
                                        isNew={itemName.includes('*') ? true : false}
                                        className="menuItem"
                                    >
                                        <ItemLink to={path}>
                                            {itemName.includes('*')
                                                ? itemName.replace('*', '')
                                                : itemName}
                                        </ItemLink>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </MenuExpend>
                    </QuickMenuContainer>
                ))}
            </SubContainer>
        </Container>
    );
}

export default SideBar;
