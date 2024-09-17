import dynamic from 'next/dynamic';

const Login = dynamic(() => import('.'), { ssr: false });

const LoginPage: React.FC = () => {
  return <Login />;
};

export default LoginPage;
