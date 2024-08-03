export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/admin',
      permanent: false,
    },
  };
}

export default function Home() {
  return null;
}