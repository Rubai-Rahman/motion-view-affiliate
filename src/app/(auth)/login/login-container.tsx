'use client';

import { useRouter } from 'next/navigation';

const LoginContainer = () => {
  const router = useRouter();

  // const handleLogin = async (formData: LoginFormDataType) => {
  //   const identifier = formData.phone?.includes('@')
  //     ? { email: formData.phone }
  //     : { phone: formData.phone };

  //   const response = await login({
  //     ...identifier,
  //     password: formData.password,
  //     rememberMe: formData.rememberMe,
  //   });

  //   if (response.success) {
  //     toast.success('🎉 Welcome back', {
  //       id: 'login-success',
  //     });
  //     if (response.role === 'admin') {
  //       router.push('/admin');
  //     } else router.push('/dashboard');
  //   } else {
  //     toast.error(response.message || 'Login Failed!');
  //   }
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>Login Container</div>
    </div>
  );
};

export default LoginContainer;
