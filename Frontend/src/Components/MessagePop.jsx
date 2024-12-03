
const MessagePop = ({ msgValue, popImg, clrShadow }) => {
  return (
    <div
      className={`fixed top-20 left-[45%] z-50 transform animate-slide-down shadow-sm ${clrShadow}`}
    >
      <div className="border-[1px] border-gray-400 rounded-lg px-12 py-[10px] bg-white flex items-center gap-3">
        <img className="h-5 w-5" src={popImg} />
        <span className="font-medium">{msgValue}</span>
      </div>
    </div>
  );
};

export default MessagePop;
