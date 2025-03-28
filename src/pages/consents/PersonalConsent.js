import React from 'react';
import SplashBar from '../../components/bar/SplashBar';
import styled from 'styled-components';
import arrowRight from '../../assets/icons/arrow-right.png';
import { useNavigate } from 'react-router-dom';

function PersonalConsent() {
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
            <ArrowImg src={arrowRight} alt="arrow" />
          </Button>
        </div>
        <Title>개인정보 수집.이용 동의</Title>
        <Box>
          <Info>
            <div style={{ fontWeight: '400' }}>
              <strong style={{ fontWeight: '600' }}>seedzip</strong>(이하
              &apos;회사&apos;라고 합니다)은(는) 개인정보보호법 등 관련 법령상의
              개인정보보호 규정을 준수하며 귀하의 개인정보보호에 최선을 다하고
              있습니다. 회사는 개인정보보호법에 근거하여 다음과 같은 내용으로
              개인정보를 수집 및 처리하고자 합니다. 다음의 내용을 자세히
              읽어보시고 모든 내용을 이해하신 후에 동의 여부를 결정해주시기
              바랍니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>
              제1조(개인정보 수집 및 이용 목적)
            </div>
            <div style={{ fontWeight: '400' }}>
              이용자가 제공한 모든 정보는 다음의 목적을 위해 수집하여
              활용됩니다. 목적 이외의 용도로는 사용되지 않으며, 이용 목적이
              변경될 때에는 사전에 이용자의 동의를 구합니다.
              <br /> - 회원 관리 : 회원제 서비스 제공, 개인 식별, 불량 회원의
              부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 불만 처리 등
              민원 처리 <br />- 서비스 제공에 관한 계약 이행 : 콘텐츠 제공,
              서비스 이용 기록 등 <br />- 신규 서비스 개발 및 마케팅 활용 :
              통계학적 특성, 이용 형태, 접속 빈도, 회원의 서비스 이용에 대한
              통계
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>
              제2조(개인정보 수집 및 이용 항목){' '}
            </div>
            <div style={{ fontWeight: '400' }}>
              회사는 개인정보 수집 목적을 위하여 다음과 같은 정보를 수집합니다.
              <br />
              - 회원가입 · 필수 : 닉네임, 이메일, 성별, 생년월일 · 선택 : 직업,
              분야 <br />- 고객문의 · 필수 : 이름, 이메일, 문의내용 · 선택 :
              첨부파일, 휴대전화번호
              <br />- 서비스 이용 · 필수 : 단말기 정보 (OS, 화면사이즈, 디바이스
              아이디, 폰기종, 단말기 모델명), IP주소, 쿠키, 방문일시, 서비스
              이용 기록
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>제3조(동의 거부 관리)</div>
            <div style={{ fontWeight: '400' }}>
              귀하는 본 안내에 따른 개인정보 수집·이용에 대하여 동의를 거부할
              권리가 있습니다. 다만, 귀하가 개인정보 동의를 거부하시는 경우에
              회원 가입 제한 등의 불이익이 발생할 수 있음을 알려드립니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '400' }}>
              본인은 위의 동의서 내용을 충분히 숙지하였으며, 위와 같이
              개인정보를 수집·이용하는데 동의합니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '400' }}>시행일자 : 2025.01.07.</div>
          </Info>
        </Box>
      </Container>
    </div>
  );
}

const ArrowImg = styled.img`
  width: 16px;
  height: 16px;
`;

const Info = styled.div`
  color: var(--gray1, #4f4f4f);
  font-size: 16px;
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
  margin-top: 34px;
  width: 108px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 8px;
  background: var(--Color-7, #dcdada);
  border: none;
  color: #4f4f4f;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-size: 38px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 100px;
`;

const Box = styled.div`
  margin-bottom: 100px;
  padding: 50px;
  width: 1076px;
  height: auto-fit;
  border-radius: 5px;
  border: 1px solid var(--gray2, #9f9f9f);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;

export default PersonalConsent;
