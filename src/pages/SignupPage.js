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
import { useSignup } from '../context/SignupContext';

function SignupPage() {
  const navigate = useNavigate();
  const { signupData, updateSignup, resetSignup } = useSignup();

  const [checked, setChecked] = useState([
    signupData.consentToTermsOfService,
    signupData.consentToPersonalInformation,
    signupData.consentToMarketingAndAds,
  ]);

  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isFieldOther, setIsFieldOther] = useState(false);
  const [customOccupation, setCustomOccupation] = useState('');
  const [customField, setCustomField] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isClicked) setIsClicked(true);
  };

  const handleChange1 = (e) => {
    const all = e.target.checked;
    setChecked([all, all, all]);
  };
  const handleChange2 = (e) =>
    setChecked([e.target.checked, checked[1], checked[2]]);
  const handleChange3 = (e) =>
    setChecked([checked[0], e.target.checked, checked[2]]);
  const handleChange4 = (e) =>
    setChecked([checked[0], checked[1], e.target.checked]);

  const schema = yup.object().shape({
    nickname: yup
      .string()
      .matches(/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\s]{1,10}$/, '*공백포함 10자 이내')
      .required('*필수 항목입니다.'),
    birthday: yup.string().required('*필수 항목입니다.'),
    gender: yup.string(),
    occupation: yup.string(),
    field: yup.string(),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { isValid, errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: signupData,
  });

  useEffect(() => {
    updateSignup('consentToTermsOfService', checked[0]);
    updateSignup('consentToPersonalInformation', checked[1]);
    updateSignup('consentToMarketingAndAds', checked[2]);

    setValue('consentToTermsOfService', checked[0]);
    setValue('consentToPersonalInformation', checked[1]);
    setValue('consentToMarketingAndAds', checked[2]);

    if (isClicked) trigger();
  }, [checked]);

  const onSubmit = async (data) => {
    const finalData = { ...signupData, ...data };
    try {
      const result = await SignUpHandler(finalData);
      if (result?.data?.status?.code === 200) {
        alert('회원가입 성공!');
        resetSignup();
        sessionStorage.setItem('firstLogin', 'true');
        navigate('/main');
      }
    } catch (error) {
      alert(`회원가입 실패: ${error.message}`);
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
                type="text"
                {...register('nickname')}
                placeholder="닉네임을 입력하세요."
                defaultValue={signupData.nickname}
                onChange={(e) => {
                  updateSignup('nickname', e.target.value);
                  setValue('nickname', e.target.value);
                }}
                onClick={handleClick}
              />
              {errors.nickname && touchedFields.nickname && (
                <Error>{errors.nickname?.message}</Error>
              )}
            </Option>

            <Option>
              <Name>생년월일 *</Name>
              <Date
                type="date"
                {...register('birthday')}
                defaultValue={signupData.birthday}
                onChange={(e) => {
                  updateSignup('birthday', e.target.value);
                  setValue('birthday', e.target.value);
                }}
                onClick={handleClick}
              />
              {errors.birthday && touchedFields.birthday && (
                <Error>{errors.birthday?.message}</Error>
              )}
            </Option>

            <Option>
              <Name>성별</Name>
              <Controller
                key={'gender'}
                name="gender"
                control={control}
                defaultValue={''}
                render={({ field }) => {
                  const handleSelect = (value) => {
                    if (field.value === value) {
                      field.onChange('');
                    } else {
                      field.onChange(value);
                    }
                  };

                  return (
                    <Gender>
                      <GenderChoice
                        $isSelected={field.value === 'MALE'}
                        onClick={() => handleSelect('MALE')}
                      >
                        남자
                      </GenderChoice>

                      <GenderChoice
                        $isSelected={field.value === 'FEMALE'}
                        onClick={() => handleSelect('FEMALE')}
                      >
                        여자
                      </GenderChoice>
                    </Gender>
                  );
                }}
              />
            </Option>

            <Option>
              <Name>직업</Name>
              <Choice>
                <Controller
                  name="occupation"
                  control={control}
                  render={({ field }) => (
                    <SingleSelectPlaceholder
                      value={field.value}
                      onChange={(value) => {
                        if (value === '기타(직접 입력)') {
                          setIsOtherSelected(true);
                          updateSignup('occupation', '');
                          field.onChange('');
                        } else {
                          setIsOtherSelected(false);
                          updateSignup('occupation', value);
                          field.onChange(value);
                        }
                      }}
                    />
                  )}
                />

                {isOtherSelected && (
                  <Input
                    placeholder="직접 입력"
                    value={customOccupation}
                    onChange={(e) => {
                      setCustomOccupation(e.target.value);
                      updateSignup('occupation', e.target.value);
                      setValue('occupation', e.target.value);
                    }}
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
                  render={({ field }) => (
                    <FieldSelectPlaceholder
                      value={field.value}
                      onChange={(value) => {
                        if (value === '기타(직접 입력)') {
                          setIsFieldOther(true);
                          updateSignup('field', '');
                          field.onChange('');
                        } else {
                          setIsFieldOther(false);
                          updateSignup('field', value);
                          field.onChange(value);
                        }
                      }}
                    />
                  )}
                />

                {isFieldOther && (
                  <Input
                    placeholder="직접 입력"
                    value={customField}
                    onChange={(e) => {
                      setCustomField(e.target.value);
                      updateSignup('field', e.target.value);
                      setValue('field', e.target.value);
                    }}
                  />
                )}
              </Choice>
            </Option>

            <Option>
              <Name>약관 동의</Name>
              <div>
                <NewContent>
                  <Contents>전체 동의</Contents>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked[0] && checked[1] && checked[2]}
                        onChange={handleChange1}
                      />
                    }
                  />
                </NewContent>

                <Lines />

                <ContentCheck>
                  <NewContent>
                    <Content onClick={() => navigate('/service-consent')}>
                      <span style={{ color: 'red' }}>(필수)</span> 서비스
                      이용약관
                      <div>{'>'}</div>
                    </Content>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked[0]}
                          onChange={handleChange2}
                        />
                      }
                    />
                  </NewContent>

                  <NewContent>
                    <Content onClick={() => navigate('/personal-consent')}>
                      <span style={{ color: 'red' }}>(필수)</span> 개인정보 수집
                      및 이용 동의
                      <div>{'>'}</div>
                    </Content>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked[1]}
                          onChange={handleChange3}
                        />
                      }
                    />
                  </NewContent>

                  <NewContent>
                    <Content onClick={() => navigate('/marketing-consent')}>
                      (선택) 마케팅 정보 수신 동의
                      <div>{'>'}</div>
                    </Content>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked[2]}
                          onChange={handleChange4}
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
