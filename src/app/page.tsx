import Layout from '@/components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Welcome to BrandBlitz</h1>
      <p>Your chat-based design collaboration platform</p>
      <a href="/auth" className="text-blue-400 underline">Go to Login</a>
    </Layout>
  );
};

export default HomePage;