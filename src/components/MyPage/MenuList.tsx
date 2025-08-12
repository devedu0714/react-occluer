import React, { useState } from "react";
import styled from "styled-components";
import { DownOutlined } from "@ant-design/icons";
import { theme } from "../../utils/theme";
import BusinessApplicationForm from "./BusinessApplicationForm";

interface SubMenuItemType {
  id?: string;
  label?: string;
  onClick?: () => void;
}

interface MenuItemType {
  id: string;
  label: string;
  onClick?: () => void;
  subItems?: SubMenuItemType[];
}

interface MenuListProps {
  menuItems: MenuItemType[];
}

const MenuContainer = styled.div`
  background: ${theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div<{
  isOpen?: boolean;
  hasSubItems?: boolean;
  isLast?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: ${(props) =>
    props.isLast ? "none" : `1px solid ${theme.colors.white}`};
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isOpen ? theme.colors.semiWhite : "transparent"};

  &:hover {
    background-color: ${theme.colors.semiWhite};
  }

  &:active {
    background-color: ${theme.colors.semiWhite};
  }
`;

const MenuText = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 400;
`;

const MenuIcon = styled.div<{ isOpen?: boolean }>`
  color: ${theme.colors.semiBlack};
  font-size: 14px;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const SubMenuContainer = styled.div<{ isOpen: boolean }>`
  max-height: ${(props) => (props.isOpen ? "none" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: ${theme.colors.white};
`;

const SubMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 15px 8px 30px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 13px;
  color: #666;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f9fa;
  }

  &:active {
    background-color: #e9ecef;
  }
`;

const MenuList: React.FC<MenuListProps> = ({ menuItems }) => {
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  const toggleMenu = (menuId: string) => {
    const newOpenMenus = new Set(openMenus);
    if (newOpenMenus.has(menuId)) {
      newOpenMenus.delete(menuId);
    } else {
      newOpenMenus.add(menuId);
    }
    setOpenMenus(newOpenMenus);
  };

  const handleMenuClick = (item: MenuItemType) => {
    if (item.subItems && item.subItems.length > 0) {
      toggleMenu(item.id);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <MenuContainer>
      {menuItems.map((item, index) => {
        // 메뉴 아이템 오픈 상태 체크
        const isOpen = openMenus.has(item.id);
        // 하위 메뉴 존재 여부 체크
        const hasSubItems = item.subItems && item.subItems.length > 0;
        // 마지막 메뉴 아이템 여부 체크
        // 회원탈퇴 메뉴 아래에 border-bottom 제거를 위해
        const isLast = index === menuItems.length - 1;

        return (
          <div key={item.id}>
            <MenuItem
              isOpen={isOpen}
              hasSubItems={hasSubItems}
              isLast={isLast}
              onClick={() => handleMenuClick(item)}
            >
              <MenuText>{item.label}</MenuText>
              <MenuIcon isOpen={isOpen}>
                <DownOutlined />
              </MenuIcon>
            </MenuItem>

            {hasSubItems && (
              <SubMenuContainer isOpen={isOpen}>
                {item.id === "business-application" ? (
                  <BusinessApplicationForm />
                ) : (
                  item.subItems!.map((subItem) => (
                    <SubMenuItem key={subItem.id} onClick={subItem.onClick}>
                      {subItem.label}
                    </SubMenuItem>
                  ))
                )}
              </SubMenuContainer>
            )}
          </div>
        );
      })}
    </MenuContainer>
  );
};

export default MenuList;
