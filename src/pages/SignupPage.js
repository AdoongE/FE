import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SplashBar from '../components/bar/SplashBar';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FieldSelectPlaceholder from '../components/dropdown/FieldDropdown';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SignUpHandler } from '../components/api/SignUpApi';
import SingleSelectPlaceholder from '../components/dropdown/JobDropdown';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [checked, setChecked] = React.useState([false, false, false]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isFieldOther, setIsFieldOther] = useState(false);
  const [customOccupation, setCustomOccupation] = useState('');
  const [customField, setCustomField] = useState('');
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
    }
  };

  const handleChange1 = (event) => {
    setChecked([
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1], checked[2]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked, checked[2]]);
  };

  const handleChange4 = (event) => {
    setChecked([checked[0], checked[1], event.target.checked]);
  };

  const schema = yup.object().shape({
    nickname: yup
      .string()
      .matches(/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\s]{1,10}$/, '*공백포함 10자 이내')
      .required('*필수 항목입니다.'),
    birthday: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, '*필수 항목입니다.')
      .required('*필수 항목입니다.'),
    gender: yup.string(),
    occupation: yup.string(),
    field: yup.string(),
    consentToTermsOfService: yup
      .boolean()
      .oneOf([true], '서비스 이용약관에 동의해야 합니다.'),

    consentToPersonalInformation: yup
      .boolean()
      .oneOf([true], '개인정보 수집 및 이용에 동의해야 합니다.'),

    consentToMarketingAndAds: yup.boolean(),
  });

  const {
    register,
    handleSubmit,
    control,
    // watch,
    setValue,
    trigger,
    formState: { isValid, errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      consentToTermsOfService: checked[0],
      consentToPersonalInformation: checked[1],
      consentToMarketingAndAds: checked[2],
    },
  });

  useEffect(() => {
    setValue('consentToTermsOfService', checked[0]);
    setValue('consentToPersonalInformation', checked[1]);
    setValue('consentToMarketingAndAds', checked[2]);
    if (isClicked) {
      trigger();
    } // 유효성 검사 강제 트리거
  }, [checked, setValue, trigger, isClicked]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      consentToTermsOfService: checked[0],
      consentToPersonalInformation: checked[1],
      consentToMarketingAndAds: checked[2],
    };
    console.log('폼 데이터 제출:', formData);

    try {
      const result = await SignUpHandler(formData); // API 호출
      if (result?.data?.status?.code === 200) {
        alert('회원가입 성공: ' + result.data.status.message);
        navigate('/main'); // 성공 시 페이지 이동
      }
    } catch (error) {
      // 에러 발생 시 에러 메시지를 경고창으로 표시
      alert(
        `회원가입 실패: ${error.message || '알 수 없는 오류가 발생했습니다.'}`,
      );
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <SplashBar />
        <Page>
          <Header>
            <Titles>회원가입</Titles>
            <Short>회원가입을 위해 정보를 입력해주세요.</Short>
            <Line />
          </Header>
          <Signup>
            <Option>
              <Name>닉네임 *</Name>
              <Inputs
                type={'text'}
                {...register('nickname')}
                placeholder="닉네임을 입력하세요."
                onClick={handleClick}
              />
              {errors.nickname && touchedFields.nickname ? (
                <Error>{errors.nickname?.message}</Error>
              ) : (
                <Error></Error>
              )}
            </Option>
            <Option>
              <Name>생년원일 *</Name>
              <Date
                onClick={handleClick}
                type="date"
                {...register('birthday')}
              />
              {errors.birthday && touchedFields.birthday ? (
                <Error>{errors.birthday?.message}</Error>
              ) : (
                <Error></Error>
              )}
            </Option>
            <Option>
              <Name>성별</Name>

              <Controller
                onClick={handleClick}
                name="gender"
                control={control}
                defaultValue={''}
                render={({ field, fieldState }) => (
                  <Gender>
                    <GenderChoice
                      label="MALE"
                      value={field.value}
                      $isSelected={field.value === 'MALE'}
                      onClick={() => field.onChange('MALE')}
                      $error={fieldState.error ? true : undefined}
                      $helperText={fieldState.error && fieldState.error.message}
                    >
                      남자
                    </GenderChoice>
                    <GenderChoice
                      label="FEMALE"
                      value={field.value}
                      $isSelected={field.value === 'FEMALE'}
                      onClick={() => field.onChange('FEMALE')}
                      $error={fieldState.error ? true : undefined}
                      $helperText={fieldState.error && fieldState.error.message}
                    >
                      여자
                    </GenderChoice>
                  </Gender>
                )}
              />
              {errors.gender && touchedFields.gender && (
                <Error>{errors.gender?.message}</Error>
              )}
            </Option>
            <Option>
              <Name>직업</Name>
              <Choice>
                <Controller
                  name="occupation"
                  control={control}
                  defaultValue={''}
                  render={({ field, fieldState }) => (
                    <SingleSelectPlaceholder
                      label="occupation"
                      $error={fieldState.error ? true : undefined}
                      $helperText={fieldState.error && fieldState.error.message}
                      value={isOtherSelected ? '' : field.value}
                      onChange={(value) => {
                        if (value === '기타(직접 입력)') {
                          field.onChange('');
                          setIsOtherSelected(true);
                        } else {
                          field.onChange(value);
                          setIsOtherSelected(false);
                        }
                      }}
                    />
                  )}
                />
                {isOtherSelected && (
                  <Input
                    placeholder="직접 입력"
                    type="text"
                    value={customOccupation}
                    onChange={(e) => setCustomOccupation(e.target.value)}
                    onBlur={() => setValue('occupation', customOccupation)}
                  />
                )}
              </Choice>
            </Option>
            <Option>
              <Name>분야</Name>
              <Choice>
                <Controller
                  name="field"
                  control={control}
                  defaultValue={''}
                  render={({ field, fieldState }) => (
                    <FieldSelectPlaceholder
                      label="field"
                      $error={fieldState.error ? true : undefined}
                      $helperText={fieldState.error && fieldState.error.message}
                      value={isFieldOther ? '' : field.value}
                      onChange={(value) => {
                        if (value === '기타(직접 입력)') {
                          field.onChange('');
                          setIsFieldOther(true);
                        } else {
                          field.onChange(value);
                          setIsFieldOther(false);
                        }
                      }}
                    />
                  )}
                />

                {isFieldOther && (
                  <Input
                    placeholder="직접 입력"
                    type="text"
                    value={customField}
                    onChange={(e) => setCustomField(e.target.value)}
                    onBlur={() => setValue('field', customField)}
                  />
                )}
              </Choice>
            </Option>
            <Option>
              <Name>약관 동의</Name>
              <div>
                <div>
                  <NewContent>
                    <Contents>전체 동의</Contents>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{
                            transform: 'translateY(-0.521vw)',
                          }}
                          sx={{
                            '& .MuiSvgIcon-root': { fontSize: '20px' },
                            '&.Mui-checked': {
                              color: '#41C3AB',
                            },
                          }}
                          checked={checked[0] && checked[1] && checked[2]}
                          onChange={handleChange1}
                        />
                      }
                    />
                  </NewContent>
                </div>
                <Lines />
                <ContentCheck>
                  <NewContent>
                    <Content onClick={() => navigate('/service-consent')}>
                      {/* accordion mui 라이브러리 이용 */}
                      <span style={{ color: 'red' }}>(필수)</span> 서비스
                      이용약관
                      <div style={{ fontWeight: '700' }}>{'>'}</div>
                    </Content>

                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{ transform: 'translateY(-0.521vw)' }}
                          checked={checked[0]}
                          onChange={handleChange2}
                          sx={{
                            '& .MuiSvgIcon-root': { fontSize: '20px' },
                            '&.Mui-checked': {
                              color: '#41C3AB',
                            },
                          }}
                        />
                      }
                    />
                  </NewContent>
                  <NewContent>
                    <Content onClick={() => navigate('/personal-consent')}>
                      <span style={{ color: 'red' }}>(필수)</span> 개인정보 수집
                      및 이용동의 <div style={{ fontWeight: '700' }}>{'>'}</div>
                    </Content>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{ transform: 'translateY(-0.521vw)' }}
                          checked={checked[1]}
                          onChange={handleChange3}
                          sx={{
                            '& .MuiSvgIcon-root': { fontSize: '20px' },
                            '&.Mui-checked': {
                              color: '#41C3AB',
                            },
                          }}
                        />
                      }
                    />
                  </NewContent>
                  <NewContent>
                    <Content onClick={() => navigate('/marketing-consent')}>
                      {/* accordion mui 라이브러리 이용 */}
                      (선택) 마케팅 활용 및 광고성 정보 수신 동의{' '}
                      <div style={{ fontWeight: '700' }}>{'>'}</div>
                    </Content>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{ transform: 'translateY(-0.521vw)' }}
                          checked={checked[2]}
                          onChange={handleChange4}
                          sx={{
                            '& .MuiSvgIcon-root': { fontSize: '20px' },
                            '&.Mui-checked': {
                              color: '#41C3AB',
                            },
                          }}
                        />
                      }
                    />
                  </NewContent>
                </ContentCheck>
              </div>
            </Option>
          </Signup>
          <Button disabled={!isValid} type="submit">
            가입하기
          </Button>
        </Page>
      </div>
    </form>
  );
}

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 8px;
  height: 15px;
`;

const Date = styled.input`
  font-size: 16px;
  width: 200px;
  height: 48px;
  border-radius: 3.75px;
  border: 1px solid var(--gray2, #9f9f9f);
  padding-left: 14px;
`;

const Button = styled.button`
  width: 520px;
  height: 60px;
  font-weight: 600;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 109px;
  background-color: #41c3ab;
  border: 0;
  border-radius: 8px;
  color: white;
  margin-bottom: 79px;

  &:disabled {
    background-color: #dcdada;
    color: #9f9f9f;
  }
`;

const NewContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentCheck = styled.div`
  margin-top: 1.094vw; /* 21px */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  column-gap: 6px;
  cursor: pointer;
`;

const Lines = styled.div`
  width: 858px;
  height: 1px;
  background: var(--gray2, #9f9f9f);
`;

const Contents = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  color: #4f4f4f;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 168px;
  height: 48px;
  border-radius: 3.75px;
  border: 1px solid var(--gray2, #9f9f9f);
  font-size: 18px;
  padding-left: 24px;

  &::placeholder {
    font-weight: 400;
    font-size: 16px;
    color: var(--gray2, #9f9f9f);
  }
`;

const Choice = styled.div`
  display: flex;
  column-gap: 20px;
`;

const GenderChoice = styled.div`
  width: 130px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 4px;
  border: 0;
  background-color: ${(props) => (props.$isSelected ? '#41C3AB' : '#DCDADA')};
`;

const Gender = styled.div`
  display: flex;
  column-gap: 16px;
`;

const Inputs = styled.input`
  width: 858px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid var(--gray2);
  font-size: 18px;
  padding-left: 20px;

  &::placeholder {
    font-weight: 400;
    font-size: 16px;
    color: var(--gray2);
  }
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 16px;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Signup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 45px;
  margin-top: 47px;
`;

const Line = styled.div`
  width: 330px;
  height: 1px;
  background-color: var(--gray2);
`;

const Short = styled.div`
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  color: #9f9f9f;
  margin-top: 18px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 72px;
`;

const Titles = styled.div`
  font-weight: 600;
  font-size: 38px;
  text-align: center;
`;

export default SignupPage;
