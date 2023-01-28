import './index.css'
import { useState } from "react";
import axios from "axios";

export default function Openai() {
  const [loading, setLoading] = useState(false);
  let [obj, setObj] = useState({ choices: [] });
  const [payload, setPayLoad] = useState({
    prompt: "",
    temperature: 0.5,
    n: 1,
    model: "text-davinci-003"
  });

  const getRes = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      data: payload,
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        //console.log(res);
        responseHandler(res);
      })
      .catch((e) => {
        setLoading(false);
        //console.log(e.message, e);
      });
  };

  const responseHandler = (res) => {
    if (res.status === 200) {
      setObj(res.data);
      console.log(res.data)
      setLoading(false);
    }
  };
  return (
    <div>
    <div className="Openai">
      <h1>
        Preguntame...
      </h1>
      <div className="container">
          <div className="text-area">
            <textarea
              type="text"
              placeholder="Enter Text"
              readOnly={loading}
              onChange={(e) => {
                setPayLoad({
                  ...payload,
                  prompt: e.target.value
                });
              }}
              value={payload.prompt}
            />
          </div>          
        <div className='btn'>
          <button  disabled={loading} onClick={getRes}>
            {loading ? "Loading... " : "Responder"}
          </button>
        </div>
        <div className="col-6 text_wrap">
            <p>
              {loading ? (
                <span>loading...</span>
              ) : (
                obj?.choices?.map((v, i) => <div>{v.text}</div>)
              )}
            </p>
          </div>
      </div>
    </div>
        <footer>
          <h5>
            Martin Juncos
          </h5>
        </footer>
    </div>
  );
}

