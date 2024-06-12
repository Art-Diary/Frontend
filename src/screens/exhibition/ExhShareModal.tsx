import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {
  heightPercentage as hp,
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';
import ConfirmationModal from '~/components/common/modal/ConfirmationModal';
import {KakaoIconBig, Instagram, Copy} from '~/assets/images/index';
import {sendText} from 'react-native-kakao-share-link';

interface ModalProps {
  handleCloseModal: () => void;
  shareWithInsta: () => void;
}

const ExhShareModal: React.FC<ModalProps> = ({
  handleCloseModal,
  shareWithInsta,
}) => {
  // const shareToKakao = async () => {
  //   try {
  //     const result = await sendText({
  //       text: '기본 템플릿으로 제공되는 텍스트 템플릿은 텍스트를 최대 200자까지 표시할 수 있습니다. 텍스트 템플릿은 텍스트 영역과 하나의 기본 버튼을 가집니다. 임의의 버튼을 설정할 수도 있습니다. 여러 장의 이미지, 프로필 정보 등 보다 확장된 형태의 카카오톡 공유는 다른 템플릿을 이용해 보낼 수 있습니다.',
  //       link: {
  //         // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
  //         //mobileWebUrl: 'https://developers.kakao.com',
  //         //  webUrl: 'https://developers.kakao.com',
  //       },
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     console.error('카카오톡 공유 실패', error);
  //   }
  // };
  return (
    <ConfirmationModal handleCloseModal={handleCloseModal}>
      <ModalContainer>
        <Message>{'공유하기'}</Message>
        <ModalContentView>
          <TouchableOpacity>
            <SnsView>
              <KakaoIconBig />
              <Sns>{'카카오톡'}</Sns>
            </SnsView>
          </TouchableOpacity>
          <TouchableOpacity onPress={shareWithInsta}>
            <SnsView>
              <Instagram />
              <Sns>{'인스타그램'}</Sns>
            </SnsView>
          </TouchableOpacity>
          <TouchableOpacity>
            <SnsView>
              <Copy />
              <Sns>{'링크복사'}</Sns>
            </SnsView>
          </TouchableOpacity>
        </ModalContentView>
      </ModalContainer>
    </ConfirmationModal>
  );
};

export default ExhShareModal;

/** style */
const ModalContainer = styled.View`
  // flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: ${wp(15)}px;
  // background-color: rgba(0, 0, 0, 0.3);
`;

const ModalContentView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* background-color: white;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 20%;*/
  padding: ${wp(10)}px;
  gap: 35px;
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${fp(17.9)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const SnsView = styled.View`
  flex-direction: column;
  align-items: center;
  padding-top: ${wp(15)}px;
`;

const Sns = styled.Text`
  text-align: center;
  font-size: ${fp(11.9)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding: ${wp(10)}px;
`;

// const Message = styled.Text`
//   text-align: center;
//   font-size: ${fp(17.9)}px;
//   color: #3c4045;
//   font-family: 'omyu pretty';
//   padding-top: ${hp(25)}px;
//   padding-bottom: ${hp(25)}px;
// `;

// const ButtonSection = styled.View`
//   /* text-align: center;
//   font-size: ${fp(17.9)}px; */
//   //flex: 1;
//   display: flex;
//   // flex-wrap: wrap;
//   color: #3c4045;
//   flex-direction: row;
//   width: 100%;
//   //gap: 5px;
//   //align-items: last baseline;
//   padding-right: ${wp(10)}px;
//   padding-left: ${wp(10)}px;
// `;

// const ButtonDetailSection = styled.View`
//   //text-align: center;
//   //display: flex;
//   flex: 1;
//   color: #3c4045;
//   flex-direction: column;
//   // gap: 10px;
//   //align-items: last baseline;
//   padding: ${wp(10)}px;
//   width: 100%;
// `;

// const DeleteButton = styled.Text`
//   text-align: center;
//   /* margin-top: ${hp(14)}px;
//   margin-right: ${hp(14)}px; */
//   font-size: ${fp(17.9)}px;
//   font-family: 'omyu pretty';
//   color: white;
//   background-color: #ff6f61;
//   padding-top: ${hp(9.5)}px;
//   padding-bottom: ${hp(9.5)}px;
//   padding-left: ${hp(30)}px;
//   padding-right: ${hp(30)}px;
//   border-radius: 5px;
// `;
