import React from 'react';
import SplashBar from '../../components/bar/SplashBar';
import styled from 'styled-components';
import arrowRight from '../../assets/icons/arrow-right.png';
import { useNavigate } from 'react-router-dom';

function MarketingConsent() {
  const navigate = useNavigate();
  return (
    <div>
      <SplashBar />
      <Container>
        <div
          style={{ width: '95%', display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button onClick={() => navigate('/signup')}>
            나가기
            <img
              src={arrowRight}
              alt="arrow"
              style={{ width: '1.25vw', height: '1.25vw' }}
            />
          </Button>
        </div>
        <Title>서비스 이용 약관</Title>
        <Short>회원가입을 위해 서비스 이용 약관에 동의해주세요</Short>
        <Line />
        <Box>
          <Info>
            <div style={{ fontWeight: '600' }}>1. 광고성 정보의 이용목적</div>
            <div style={{ fontWeight: '400' }}>
              seedzip에서 제공하는 이용자 맞춤형 서비스, 뉴스레터 발송, 새로운
              기능의 안내, 각종 경품 행사, 이벤트 등의 광고성 정보를
              전자우편이나 서신, 우편, 문자(SMS), 푸시 등을 통해 이용자에게
              제공합니다. 이메일 및 SMS 수신거부와 관계없이 광고나 영리성 목적
              외의 약관안내 및 서비스 내용, 회사의 주요 정책 관련 변경에 따른
              안내 등 의무적으로 안내되어야 하는 메일은 정상적으로 발송됩니다.{' '}
              <br /> <br />
              마케팅 수신 동의는 거부하실 수 있으며 동의 이후에라도 고객의
              의사에 따라 동의를 철회할 수 있습니다. 동의를 거부하시더라도
              헤이버니가 제공하는 서비스의 이용에 제한이 되지 않습니다. 단,
              이벤트 및 이용자 맞 춤형 상품 추천 등의 마케팅 정보 안내 서비스가
              제한됩니다. <br /> <br /> 이메일 수신동의를 하셨음에도 이메일을
              받지 못하고 계신다면, 아래 내용을 확인해 주세요. <br /> - 이메일
              주소가 잘못 등록되어 있을 경우 <br /> - 해당 사이트 이메일이
              스팸메일로 설정되어 있을 경우 <br /> - 위 사항을 점검했음에도 문제
              해결이 안 되신 경우, 고객센터로 연락 주세요. <br /> <br />{' '}
              &apos;수신거부&apos;로 변경하여도 수정 전에 예약발송 메일 또는
              SMS가 설정되어 있어 약 일주일 동안은 메일 또는 SMS가 발송될 수
              있습니다. 이점 양해 부탁드립니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>2. 미동의 시 불이익 사항 </div>
            <div style={{ fontWeight: '400' }}>
              개인정보보호법 제22조 제5항에 의해 선택정보 사항에 대해서는 동의
              거부하시더라도 서비스 이용에 제한되지 않습니다. 단, 이벤트 및
              이용자 맞춤형 상품 추천 등의 마케팅 정보 안내 서비스가 제한됩니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>
              3. 서비스 정보 수신 동의 철회{' '}
            </div>
            <div style={{ fontWeight: '400' }}>
              seedzip에서 제공하는 마케팅 정보를 원하지 않을 경우
              sma07037@naver.com로 철회를 요청할 수 있습니다
            </div>
          </Info>
        </Box>
      </Container>
    </div>
  );
}

const Info = styled.div`
  color: #232323;
  font-family: 'Pretendard Variable';
  font-size: 1.0417vw;
  font-style: normal;
  line-height: 130%;
  white-space: 'pre-line';
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  margin-top: 2.812vw;
  width: 7.917vw;
  height: 2.969vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  column-gap: 0.26vw;
  border-radius: 0.52vw;
  background: var(--Color-7, #dcdada);
  border: none;
  color: #4f4f4f;
  font-family: 'Pretendard Variable';
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 2.604vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Short = styled.div`
  margin-top: 1.354vw;
  margin-bottom: 1.042vw;
  color: var(--Color-5, #9f9f9f);
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Line = styled.div`
  width: 26.615vw;
  height: 0.052vw;
  background: var(--Color-5, #9f9f9f);
  margin-bottom: 4.167vw;
`;

const Box = styled.div`
  margin-bottom: 6.25vw;
  padding: 2.812vw 3.854vw;
  width: 69.167vw;
  height: auto-fit;
  border-radius: 0.26vw;
  border: 0.05vw solid var(--Color-5, #9f9f9f);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: 2.29vw;
`;

export default MarketingConsent;
