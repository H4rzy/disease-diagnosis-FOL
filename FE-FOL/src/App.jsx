import { useState } from 'react';
import './App.css';
import symptomList from '../../symptoms.json';

function App() {
  const [symptomInput, setSymptomInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [result, setResult] = useState(null); 


  const handleInputChange = (e) => {
    const value = e.target.value;
    setSymptomInput(value);

    if (!value.trim()) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = symptomList.filter(
      (s) =>
        s.toLowerCase().includes(value.toLowerCase()) &&
        !selectedSymptoms.includes(s)
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSymptoms([...selectedSymptoms, suggestion]);
    setSymptomInput('');
    setShowSuggestions(false);
  };

  const handleRemoveTag = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  // --- Gửi triệu chứng tới backend ---
  const handleSearch = async () => {
    if (selectedSymptoms.length === 0)
      return alert('Vui lòng chọn ít nhất một triệu chứng.');

    try {
      const response = await fetch('http://localhost:3000/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symptoms: selectedSymptoms })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result); // 👈 lưu kết quả để hiển thị
      } else {
        setResult(`Lỗi: ${data.error || 'Không rõ'}`);
      }
    } catch (error) {
      console.error(error);
      setResult('Không thể kết nối đến server.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dự đoán bệnh dựa trên triệu chứng ứng dụng logic vị từ</h1>

        <div className="search-container">
          <div className="tag-input-area">
            {selectedSymptoms.map((symptom, index) => (
              <div key={index} className="tag">
                {symptom}
                <span
                  className="remove-tag"
                  onClick={() => handleRemoveTag(symptom)}
                >
                  ✕
                </span>
              </div>
            ))}
            <input
              type="text"
              className="search-input"
              placeholder={
                selectedSymptoms.length === 0
                  ? 'Nhập triệu chứng của bạn...'
                  : ''
              }
              value={symptomInput}
              onChange={handleInputChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && symptomInput.trim() !== '') {
                  handleSuggestionClick(symptomInput.trim());
                }
              }}
            />
          </div>

          <button onClick={handleSearch} className="search-button">
            Tìm kiếm
          </button>
        </div>

        {/* --- Danh sách gợi ý --- */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="suggestion-list">
            {filteredSuggestions.map((item, index) => (
              <li key={index} onClick={() => handleSuggestionClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* --- Kết quả hiển thị ở đây --- */}
       {result && Array.isArray(result) && (
  <div className="result-box">
    <h3>Kết quả chẩn đoán:</h3>
    <ul className="result-list">
      {(() => {
        // Tính tổng tất cả điểm
        const totalScore = result.reduce((sum, r) => sum + r[1], 0);
        return result.map(([disease, score], index) => {
          const percent = ((score / totalScore) * 100).toFixed(1);
          return (
            <li key={index}>
              <span className="disease">{disease}</span>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <span className="percent">{percent}%</span>
            </li>
          );
        });
      })()}
    </ul>
  </div>
)}

      </header>
    </div>
  );
}

export default App;
