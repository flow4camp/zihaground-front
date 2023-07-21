import React, {  ChangeEvent } from "react";
import { Box, Center, Image, Text, Input, Button, Flex, Divider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login() {

  const [inputId, setInputId] = useState('');
  const [inputPwd, setInputPwd] = useState('');

  const onChangeId = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputId(e.target.value);
  };
  
  const onChangePwd = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputPwd(e.target.value);
  };

  return (
    <Center
      w='100%'
      h='100vh'
      alignContent="center" 
    >
      <Center
        w='70%'
        h="100vh"
        alignContent='center'
      >
        <Flex
          direction='column'
          align='center'
          justify='center'
          gap={2}
        >
          <Flex
            direction='column'
            align='center'
            justify='center'
          >
            <Image src='/logo_x0.5.png' w='50px' h='50px' m={3} />
            <Text
              fontSize='3xl'
              fontWeight='bold'
              style={{ fontFamily: 'Font-Title' }}
            >지하그라운드</Text>
            <Text
              style={{ fontFamily: 'Font-Title-Light' }}
            >오 늘 도 출 근</Text>
          </Flex>
          <Flex
            direction='column'
            align='center'
            p={5}
            gap={2}
          >
            <Text 
              marginBottom={3} 
              style={{ fontFamily: 'Font-Content' }}
              >계정에 로그인하세요</Text>
            <Center>
              <Input
                variant="outline"
                placeholder="Enter Email"
                size="md"
                type='email'
                value={inputId}
                onChange={onChangeId}
              />
            </Center>
            <Center>
              <Input
                variant="outline"
                placeholder="Enter Password"
                size="md"
                type="password"
                value={inputPwd}
                onChange={onChangePwd}
              />
            </Center>
          </Flex>
          <Text 
            fontSize="md"
            style={{ fontFamily: 'Font-Content' }}
          >
            계정이 없으신가요?{' '}
            <Link to="/signin">
              <Text as="u">Sign Up</Text>
            </Link>
          </Text>
          <Flex
            direction='column'
            align='center'
            p={3}
            gap={2}
          >
            <Center>
              <Button
                w='220px'
                style={{ fontFamily: 'Font-Content-Light' }}
              >
                로그인
              </Button>
            </Center>
            <Center>
              <Button
                w='220px'
                style={{ fontFamily: 'Font-Content-Light' }}
              >
                카카오 계정으로 로그인
              </Button>
            </Center>
          </Flex>
        </Flex>
      </Center>
    </Center>
  );
}

export default Login;
