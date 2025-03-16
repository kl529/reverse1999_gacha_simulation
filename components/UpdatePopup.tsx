import { updateLogs } from "@/data/updates";

interface UpdatePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdatePopup({ isOpen, onClose }: UpdatePopupProps) {
  if (!isOpen) return null;

  return (
    // 배경 클릭 시 모달 닫힘
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      {/* 모달 내부 클릭은 닫히지 않도록 이벤트 전파 중단 */}
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-[500px] max-h-[600px] overflow-y-auto dark:bg-gray-800 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
          업데이트 내역
        </h2>
        <ul className="list-disc pl-5 text-gray-900 dark:text-gray-100">
          {updateLogs.map((log, index) => (
            <li key={index} className="mb-3 text-lg">
              <strong>{log.date}:</strong> {log.content}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition dark:bg-red-600 dark:hover:bg-red-700"
        >
          닫기
        </button>
      </div>
    </div>
  );
}