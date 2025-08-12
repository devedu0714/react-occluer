import React from "react";
import styled from "styled-components";
import { Progress, Typography } from "antd";
import { theme } from "../../utils/theme";

const { Text } = Typography;

const ProfileContainer = styled.div`
  background: ${theme.colors.white};
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  flex-shrink: 0;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.colors.primary}, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const ChangeLink = styled(Text)`
  color: ${theme.colors.inputPlaceholder};
  font-size: 10px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
`;

const UserInfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const UserNameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  div {
    display: flex;
    gap: 10px;
  }
`;

const UserInfoRow = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const UserId = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;

const LevelSection = styled.div`
  width: calc(40% - 10px);
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
`;

const LevelText = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: #333;
`;

const ProgressContainer = styled.div`
  width: 100%;
`;

const ProgressText = styled(Text)`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
  display: block;
`;

const PointsSection = styled.div`
  width: calc(60% - 10px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const PointsHeader = styled.div`
  display: flex;
  gap: 15px;
`;

const PointsLink = styled(Text)`
  color: ${theme.colors.inputPlaceholder};
  font-size: 10px;
  cursor: pointer;
  text-decoration: underline;
  line-height: 18px;
`;

const PointsLabel = styled(Text)`
  font-size: 12px;
  color: #666;
  font-weight: 500;
`;

const PointsAmount = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.primary};
`;

interface UserProfileProps {
  user: {
    u_id: string;
    name: string;
    level: number;
    exp: number;
    maxExp: number;
    points: number;
    avatar: string;
  };
  onAvatarChange?: () => void;
  onNicknameChange?: () => void;
  onPointsHistory?: () => void;
  onGiftCertificate?: () => void;
  onLogout?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onAvatarChange,
  onNicknameChange,
  onPointsHistory,
  onGiftCertificate,
  onLogout,
}) => {
  const progressPercentage = (user.exp / user.maxExp) * 100;

  return (
    <ProfileContainer>
      <AvatarSection>
        <Avatar>
          {user.avatar ? (
            <img src={user.avatar} alt="User Avatar" />
          ) : (
            user.name.charAt(0)
          )}
        </Avatar>
        <ChangeLink onClick={onAvatarChange}>변경</ChangeLink>
      </AvatarSection>

      <UserInfoSection>
        <UserNameRow>
          <UserId>{user.name}</UserId>
          <div>
            <ChangeLink onClick={onNicknameChange}>변경</ChangeLink>
            <ChangeLink onClick={onLogout}>로그아웃</ChangeLink>
          </div>
        </UserNameRow>
        <UserInfoRow>
          <LevelSection>
            <LevelText>레벨 {user.level}</LevelText>
            <ProgressContainer>
              <ProgressText>
                {user.exp}/{user.maxExp}
              </ProgressText>
              <Progress
                percent={progressPercentage}
                showInfo={false}
                strokeColor={theme.colors.primary}
                trailColor="#f0f0f0"
              />
            </ProgressContainer>
          </LevelSection>

          <PointsSection>
            <PointsHeader>
              <PointsLabel>포인트</PointsLabel>
              <PointsLink onClick={onPointsHistory}>내역</PointsLink>
              <PointsLink onClick={onGiftCertificate}>상품권신청</PointsLink>
            </PointsHeader>
            <PointsAmount>{user.points.toLocaleString()}P</PointsAmount>
          </PointsSection>
        </UserInfoRow>
      </UserInfoSection>
    </ProfileContainer>
  );
};

export default UserProfile;
