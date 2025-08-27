
const MessagePop = ({ msgValue, popImg, clrShadow }) => {
  return (
    <div
      className={`fixed bottom-16 left-[15%] z-50 transform animate-slide-up shadow-[0_0_20px_5px_rgba(0,0,0,0.2)] bg-white rounded-lg ${clrShadow}`}
    >
      <div className="border-[2px] border-gray-400 rounded-lg px-14 py-2 bg-white flex items-center gap-3">
        <img className="h-5 w-5" src={popImg} />
        <span className="font-medium">{msgValue}</span>
      </div>
    </div>
  );
};

export default MessagePop;
