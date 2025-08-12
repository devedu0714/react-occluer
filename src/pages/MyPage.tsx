import styled from "styled-components";
import { useAppStore } from "../store";
import { UserProfile, MenuList } from "../components/MyPage";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { theme } from "../utils/theme";

const MyPageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 50px);
  background-color: ${theme.colors.white};
  padding: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const MyPage = () => {
  const navigate = useNavigate();
  const { user, setLogin } = useAppStore();

  // 더미 사용자 데이터 (실제로는 API에서 가져올 데이터)
  const userData = {
    u_id: user?.resObject?.u_id,
    name: user?.resObject?.name,
    level: 1,
    exp: 38,
    maxExp: 1000,
    points: 36800,
    avatar: "https://picsum.photos/200/300",
  };

  // 메뉴 아이템 정의
  const menuItems = [
    {
      id: "business-application",
      label: "업체신청",
      subItems: [{}],
    },
    {
      id: "events",
      label: "이벤트",
      subItems: [
        {
          id: "event-list",
          label: "진행 중인 이벤트",
          onClick: () => {
            message.info("진행 중인 이벤트 기능은 준비 중입니다.");
          },
        },
        {
          id: "event-history",
          label: "참여 이벤트 내역",
          onClick: () => {
            message.info("참여 이벤트 내역 기능은 준비 중입니다.");
          },
        },
      ],
    },
    {
      id: "coupons",
      label: "쿠폰함",
      subItems: [
        {
          id: "coupon-available",
          label: "사용 가능한 쿠폰",
          onClick: () => {
            message.info("사용 가능한 쿠폰 기능은 준비 중입니다.");
          },
        },
        {
          id: "coupon-used",
          label: "사용한 쿠폰",
          onClick: () => {
            message.info("사용한 쿠폰 기능은 준비 중입니다.");
          },
        },
        {
          id: "coupon-expired",
          label: "만료된 쿠폰",
          onClick: () => {
            message.info("만료된 쿠폰 기능은 준비 중입니다.");
          },
        },
      ],
    },
    {
      id: "messages",
      label: "메세지함",
      subItems: [
        {
          id: "message-inbox",
          label: "받은 메시지",
          onClick: () => {
            message.info("받은 메시지 기능은 준비 중입니다.");
          },
        },
        {
          id: "message-sent",
          label: "보낸 메시지",
          onClick: () => {
            message.info("보낸 메시지 기능은 준비 중입니다.");
          },
        },
      ],
    },
    {
      id: "reviews",
      label: "리뷰내역",
      subItems: [
        {
          id: "review-written",
          label: "작성한 리뷰",
          onClick: () => {
            message.info("작성한 리뷰 기능은 준비 중입니다.");
          },
        },
        {
          id: "review-liked",
          label: "좋아요한 리뷰",
          onClick: () => {
            message.info("좋아요한 리뷰 기능은 준비 중입니다.");
          },
        },
      ],
    },
    {
      id: "faq",
      label: "자주묻는질문",
      subItems: [
        {
          id: "faq-list",
          label: "자주묻는질문",
          onClick: () => {
            message.info("자주묻는질문 기능은 준비 중입니다.");
          },
        },
      ],
    },
    {
      id: "customer-service",
      label: "고객센터",
      subItems: [
        {
          id: "cs-contact",
          label: "1:1 문의",
          onClick: () => {
            message.info("1:1 문의 기능은 준비 중입니다.");
          },
        },
        {
          id: "cs-faq",
          label: "FAQ",
          onClick: () => {
            message.info("FAQ 기능은 준비 중입니다.");
          },
        },
      ],
    },
    {
      id: "notifications",
      label: "알림설정",
      subItems: [
        {
          id: "notif-push",
          label: "푸시 알림",
          onClick: () => {
            message.info("푸시 알림 설정 기능은 준비 중입니다.");
          },
        },
        {
          id: "notif-email",
          label: "이메일 알림",
          onClick: () => {
            message.info("이메일 알림 설정 기능은 준비 중입니다.");
          },
        },
      ],
    },
    {
      id: "terms",
      label: "이용약관",
      onClick: () => {
        message.info("이용약관 기능은 준비 중입니다.");
      },
    },
    {
      id: "withdrawal",
      label: "회원탈퇴",
      onClick: () => {
        message.info("회원탈퇴 기능은 준비 중입니다.");
      },
    },
  ];

  // 프로필 관련 핸들러들
  const handleAvatarChange = () => {
    message.info("프로필 이미지 변경 기능은 준비 중입니다.");
  };

  const handleNicknameChange = () => {
    message.info("닉네임 변경 기능은 준비 중입니다.");
  };

  const handlePointsHistory = () => {
    message.info("포인트 내역 기능은 준비 중입니다.");
  };

  const handleGiftCertificate = () => {
    message.info("상품권 신청 기능은 준비 중입니다.");
  };

  // 로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.removeItem("isLogin");
    setLogin(false, null);
    message.success("로그아웃되었습니다.");
    navigate("/");
  };

  return (
    <MyPageContainer>
      <ContentWrapper>
        <UserProfile
          user={userData}
          onAvatarChange={handleAvatarChange}
          onNicknameChange={handleNicknameChange}
          onPointsHistory={handlePointsHistory}
          onGiftCertificate={handleGiftCertificate}
          onLogout={logoutHandler}
        />
        <MenuList menuItems={menuItems} />
      </ContentWrapper>
    </MyPageContainer>
  );
};

export default MyPage;
