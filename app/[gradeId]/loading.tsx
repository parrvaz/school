const Loading: React.FC = () => (
  <div className="h-screen flex-1 bg-berry10 -mt-10 p-12 md:h-[calc(100vh-8rem)]">
    <div className="bg-gray-300 h-6 w-52 animate-pulse rounded-xl bg-black11" />
    <div className="bg-gray-300 mt-16 h-4 w-full animate-pulse rounded-xl bg-black11" />
    <div className="bg-gray-300 mt-4 h-4 w-full animate-pulse rounded-xl bg-black11" />
    <div className="bg-gray-300 mt-4 h-4 w-full animate-pulse rounded-xl bg-black11" />
    <div className="bg-gray-300 mt-4 h-4 w-full animate-pulse rounded-xl bg-black11" />
    <div className="bg-gray-300 mt-4 h-4 w-full animate-pulse rounded-xl bg-black11" />
  </div>
);
export default Loading;
