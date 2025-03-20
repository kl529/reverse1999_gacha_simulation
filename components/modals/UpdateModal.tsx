import { updateLogs } from "@/data/updates";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 업데이트 내역 모달
export default function UpdateModal({ isOpen, onClose }: UpdateModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[700px] max-h-[600px] overflow-y-auto dark:bg-gray-800 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목 & 닫기 버튼 영역 */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex justify-between items-center z-50">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            업데이트 내역
          </h2>
          {/* 닫기 버튼 (항상 보이도록 처리) */}
          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform"
          >
            ✕
          </button>
        </div>

        {/* 업데이트 로그 리스트 */}
        <ul className="list-disc pl-5 text-gray-900 dark:text-gray-100 mt-4">
          {updateLogs.map((log, index) => (
            <li key={index} className="mb-3 text-lg">
              <strong>{log.date}:</strong> {log.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}