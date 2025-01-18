import React from 'react';
import SplashBar from '../../components/bar/SplashBar';
import styled from 'styled-components';
import arrowRight from '../../assets/icons/arrow-right.png';
import { useNavigate } from 'react-router-dom';

function ServiceConsent() {
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
            <div style={{ fontWeight: '600' }}>제1조(목적)</div>
            <div style={{ fontWeight: '400' }}>
              본 약관은 seedzip(이하 &apos;회사&apos;라고 합니다)가 제공하는
              제반 서비스의 이용과 관련하여 회사와 회원과의 권리, 의무 및
              책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>제2조(정의)</div>
            <div style={{ fontWeight: '400' }}>
              이 약관에서 사용하는 주요 용어의 정의는 다음과 같습니다.
              <br />
              1. &apos;서비스&apos;라 함은 구현되는 단말기(PC, TV, 휴대형단말기
              등의 각종 유무선 장치를 포함)와 상관없이 &apos;이용자&apos;가
              이용할 수 있는 회사가 제공하는 제반 서비스를 의미합니다.
              <br />
              2. &apos;이용자&apos;란 이 약관에 따라 회사가 제공하는 서비스를
              받는 &apos;회원&apos;을 말합니다.
              <br /> 3. &apos;회원&apos;은 회사에 개인정보를 제공하여 회원등록을
              한 사람으로, 회사로부터 지속적으로 정보를 제공받고
              &apos;회사&apos;가 제공하는 서비스를 계속적으로 이용할 수 있는
              자를 말합니다. <br /> 4. &apos;씨드&apos;란 &apos;콘텐츠&apos;와
              같은 의미로, 회원이 서비스 내에서 생성하거나 업로드하는 모든 정보,
              데이터, 파일 및 링크를 포괄합니다. 씨드는 텍스트, 이미지, 비디오
              및 기타 미디어 형식을 포함합니다.
              <br />
              5. &apos;이용계약&apos;이란 회사와 회원 간에 서비스 이용을 위한
              계약을 의미하며, 회원이 약관에 동의함으로써 성립됩니다. 이
              계약에는 서비스 이용과 관련된 모든 권리 및 의무가 포함됩니다.
              &apos;
              <br />
              6. 닉네임&apos;이란, 회원의 식별을 위해 회사가 부여한 문자 또는
              문자와 숫자의 조합을 의미합니다.
              <br />
              7. &apos;카테고리&apos;란, 회원이 서비스 내에서 씨드를 저장하고
              분류하기 위해 생성하는 폴더의 개념입니다.
              <br /> 8. &apos;태그&apos;란, 회원이 씨드의 내용을 식별하기 위한
              수단이자, 씨드를 검색하고 필터링할 수 있는 요소입니다. 본 약관에서
              사용하는 용어 중 위에서 정하지 않은 것은 본 약관의 다른 조항 또는
              seedzip 서비스 상 개별 서비스별 정책 또는 안내 등에서 정하는 바에
              따르며, 정하지 않은 사항은 일반 관행에 따릅니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>제3조(약관 외 준칙)</div>
            <div style={{ fontWeight: '400' }}>
              이 약관에서 정하지 아니한 사항에 대해서는 법령 또는 회사가 정한
              서비스의 개별약관, 운영정책 및 규칙 등(이하 세부지침)의 규정에
              따릅니다. 또한 본 약관과 세부지침이 충돌할 경우에는 세부지침에
              따릅니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>제4조(약관의 효력과 변경)</div>
            <div style={{ fontWeight: '400' }}>
              1. 본 약관은 seedzip(이)가 제공하는 모든 인터넷서비스에 게시하여
              공시합니다. &apos;회사&apos;는 &apos;전자상거래 등에서의
              소비자보호에 관한 법률(이하 &apos;전자상거래법&apos;이라
              함)&apos;, 약관의 규제에 관한 법률(이하 &apos;약관규제법&apos;이라
              함)&apos;, &apos;전자문서 및 전자거래 기본법(이하
              &apos;전자문서법&apos;이라 함)&apos;, &apos;전자금융거래법&apos;,
              &apos;정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하
              &apos;정보통신망법&apos;이라 함)&apos;, &apos;소비자기본법&apos;
              등 관계 법령(이하 &apos;관계법령&apos;이라 함)에 위배되지 않는
              범위 내에서 이 약관을 변경할 수 있으며, 회사는 약관이 변경되는
              경우에 변경된 약관의 내용과 시행일을 정하여, 그 시행일로부터 최소
              7일 (이용자에게 불리하거나 중대한 사항의 변경은 30일) 이전부터
              시행일 후 상당한 기간 동안 공지하고, 기존 이용자에게는 변경된
              약관, 적용일자 및 변경사유(변경될 내용 중 중요사항에 대한 설명을
              포함)를 별도의 전자적 수단(전자우편, 문자메시지, 서비스 내
              전자쪽지발송, 알림 메시지를 띄우는 등의 방법)으로 개별 통지합니다.
              변경된 약관은 공지하거나 통지한 시행일로부터 효력이 발생합니다.
              <br />
              2. 회사가 제1항에 따라 개정약관을 공지 또는 통지하는 경우
              &apos;변경에 동의하지 아니한 경우 공지일 또는 통지를 받은 날로부터
              7일(이용자에게 불리하거나 중대한 사항의 변경인 경우에는 30일) 내에
              계약을 해지할 수 있으며, 계약 해지의 의사표시를 하지 아니한
              경우에는 변경에 동의한 것으로 본다.&apos; 라는 취지의 내용을 함께
              통지합니다.
              <br />
              3. 이용자가 제2항의 공지일 또는 통지를 받은 날로부터 7일(또는
              이용자에게 불리하게 나 중대한 사항의 변경인 경우에는 30일)내에
              변경된 약관에 대해 거절의 의사를 표시하지 않았을 때에는 본 약관의
              변경에 동의한 것으로 간주합니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>제5조(이용자에 대한 통지)</div>
            <div style={{ fontWeight: '400' }}>
              1. 회사는 이 약관에 별도 규정이 없는 한 이용자에게 전자우편,
              문자메시지(SMS), 전자 쪽지, 푸쉬/(Push)알림 등의 전자적 수단을
              이용하여 통지할 수 있습니다. <br />
              2. 회사는 이용자 전체에 대한 통지의 경우 7일 이상 회사가 운영하는
              웹사이트 내의 게시판에 게시함으로써 제1항의 통지에 갈음할 수
              있습니다. 다만, 이용자 본인의 거래와 관련하여 중대한 영향을 미치는
              사항에 대하여는 제1항의 개별 통지를 합니다. <br />
              3. 회사는 이용자의 연락처 미기재, 변경 후 미수정, 오기재 등으로
              인하여 개별 통지가 어려운 경우에 한하여 전항의 공지를 함으로써
              개별 통지를 한 것으로 간주합니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>제6조(이용계약의 체결)</div>
            <div style={{ fontWeight: '400' }}>
              이용계약은 다음의 경우에 체결됩니다. <br />
              1. 이용자가 회원으로 가입하고자 하는 경우 이용자가 약관의 내용에
              대하여 동의를 한 다음 회원가입신청을 하고 회사가 이러한 신청에
              대하여 승낙한 때 <br />
              2. 이용자가 회원 가입 없이 이용할 수 있는 서비스에 대하여 회원
              가입의 신청없이 서비스를 이용하고자 하는 경우에는 회사 서비스
              이용을 위해 결제하는 때 <br />
              3. 이용자가 회원가입 없이 이용할 수 있는 서비스에 대하여
              회원가입의 신청없이 무료 서비스를 이용하고자 하는 경우에는 그 무료
              서비스와 관련된 사항의 저장 등 부가서비스를 이용하면서 위 1호 및
              2호의 절차를 진행한 때
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>제7조(회원가입에 대한 승낙)</div>
            <div style={{ fontWeight: '400' }}>
              1. 회사는 이용계약에 대한 요청이 있을 때 서비스 이용을 승낙함을
              원칙으로 합니다. <br />
              2. 제1항에 따른 신청에 있어 회사는 서비스 제공에 필요한 경우
              전문기관을 통한 실명 확인 및 본인인증을 요청할 수 있습니다. <br />
              3. 회사는 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상
              문제가 있는 경우에는 승낙을 유보할 수 있습니다. <br />
              4. 제3항에 따라 서비스 이용을 승낙하지 아니하거나 유보한 경우,
              회사는 원칙적으로 이를 서비스 이용 신청자에게 알리도록 합니다. 단,
              회사의 귀책사유 없이 이용자에게 알릴 수 없는 경우에는 예외로
              합니다.
              <br />
              5. 이용계약의 성립 시기는 제6조 제1호의 경우에는 회사가 가입완료를
              신청절차 상에서 표시한 시점, 제6조 제2호의 경우에는 결제가
              완료되었다는 표시가 된 시점으로 합니다. <br />
              6. 회사는 회원에 대해 회사정책에 따라 등급별로 구분하여 이용시간,
              이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.{' '}
              <br />
              7. 회사는 회원에 대하여 &apos;영화및비디오물의진흥에관한법률&apos;
              및 &apos;청소년보호법&apos; 등에 따른 등급 및 연령 준수를 위하여
              이용제한이나 등급별 제한을 둘 수 있습니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>제8조(회원정보의 변경)</div>
            <div style={{ fontWeight: '400' }}>
              1. 회원은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를
              열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한 실명,
              아이디 등은 수정이 불가능합니다. <br />
              2. 회원은 회원가입 신청 시 기재한 사항이 변경되었을 경우
              온라인으로 수정을 하거나 전자우편 기타 방법으로 회사에 대하여 그
              변경사항을 알려야 합니다. <br />
              3. 제2항의 변경사항을 회사에 알리지 않아 발생한 불이익에 대하여는
              회원에게 책임이 있습니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>
              제9조(회원정보의 관리 및 보호)
            </div>
            <div style={{ fontWeight: '400' }}>
              1. 회원의 아이디(ID)와 비밀번호에 관한 관리책임은 회원에게 있으며,
              이를 제3자가 이용하도록 하여서는 안 됩니다. <br />
              2. 회사는 회원의 아이디(ID)가 개인정보 유출 우려가 있거나,
              반사회적 또는 공서양속 에 어긋나거나, 회사 또는 서비스의 운영자로
              오인할 우려가 있는 경우, 해당 아이디(ID)의 이용을 제한할 수
              있습니다. <br />
              3. 회원은 아이디(ID) 및 비밀번호가 도용되거나 제3자가 사용하고
              있음을 인지한 경우에는 이를 즉시 회사에 통지하고 안내에 따라야
              합니다. <br />
              4. 제3항의 경우 해당 회원이 회사에 그 사실을 통지하지 않거나,
              통지하였으나 회사의 안내에 따르지 않아 발생한 불이익에 대하여
              회사는 책임지지 않습니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>제10조(회사의 의무)</div>
            <div style={{ fontWeight: '400' }}>
              1.회사는 계속적이고 안정적인 서비스의 제공을 위하여 설비에 장애가
              생기거나 멸실된 때에는 이를 지체 없이 수리 또는 복구하며, 다음 각
              호의 사유 발생 시 부득이한 경우 예고 없이 서비스의 전부 또는
              일부의 제공을 일시 중지할 수 있습니다. 이 경우 그 사유 및 중지
              기간 등을 이용자에게 지체 없이 사후 공지합니다. <br />{' '}
              <span style={{ paddingLeft: '1.5em' }}>가.</span> 시스템의
              긴급점검, 증설, 교체, 시설의 보수 또는 공사를 하기 위하여 필요한
              경우 <br /> <span style={{ paddingLeft: '1.5em' }}>나.</span>{' '}
              새로운 서비스를 제공하기 위하여 시스템 교체가 필요하다고 판단되는
              경우 <br /> <span style={{ paddingLeft: '1.5em' }}>다.</span>{' '}
              시스템 또는 기타 서비스 설비의 장애, 유무선 Network 장애 등으로
              정상적인 서비스 제공이 불가능할 경우 <br />{' '}
              <span style={{ paddingLeft: '1.5em' }}>라.</span> 국가비상사태,
              정전, 불가항력적 사유로 인한 경우 <br />
              2. 회사는 이용계약의 체결, 계약사항의 변경 및 해지 등 이용자와의
              계약관련 절차 및 내용 등에 있어 이용자에게 편의를 제공하도록
              노력합니다 <br />
              3. 회사는 대표자의 성명, 상호, 주소, 전화번호, 모사전송번호(FAX),
              통신판매업 신고번호, 이용약관, 개인정보취급방침 등을 이용자가 쉽게
              알 수 있도록 온라인 서비스 초기화면에 게시합니다.
            </div>
          </Info>
          <Info>
            <div style={{ fontWeight: '600' }}>제11조(개인정보보호)</div>
            <div style={{ fontWeight: '400' }}>
              1. 회사는 이용자들의 개인정보를 중요시하며, 정보통신망 이용촉진 및
              정보보호 등에 관한 법률, 개인정보보호법 등 관련 법규를 준수하기
              위해 노력합니다. 회사는 개인정보보호정책을 통하여 이용자가
              제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며
              개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
              <br />
              2. 회사가 이용자의 개인정보의 보호 및 사용에 대해서 관련 법규 및
              회사의 개인정보처리방침을 적용합니다. 다만, 회사에서 운영하는
              웹사이트 등에서 링크된 외부 웹페이지에서는 회사의
              개인정보처리방침이 적용되지 않습니다.
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

export default ServiceConsent;
