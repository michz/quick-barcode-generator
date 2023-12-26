import { useEffect, useRef, useState } from "react";
//import { invoke } from "@tauri-apps/api/tauri";
import { getMatches } from '@tauri-apps/api/cli'

import { BrowserQRCodeSvgWriter } from "@zxing/browser";


function App() {
  const [code, setCode] = useState("");
  const inputElement = useRef<HTMLInputElement>(null)
  const result = useRef<HTMLDivElement>(null)

  async function generateCode() {
    if (!result.current) return;
    if (code.length === 0) return;

    const codeWriter = new BrowserQRCodeSvgWriter()

    result.current.innerText = '';
    const svgElement: SVGSVGElement = codeWriter.write(code, 400, 400)
    svgElement.setAttribute("width", "100%")
    svgElement.setAttribute("height", "100%")
    result.current.append(svgElement)
  }

  useEffect(() => {
    getMatches().then((matches) => {
      if (!inputElement.current) return;
      if ("data" in matches.args && matches.args["data"].value !== null) {
        setCode(matches.args["data"].value.toString())
        //generateCode()
      }
    })
  }, [getMatches])

  // Code changed
  useEffect(() => {
    generateCode()
  }, [code])

  return (
    <div className="container">
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          //generateCode();
        }}
      >
        <input
          id="code-input"
          ref={inputElement}
          onChange={(e) => setCode(e.currentTarget.value)}
          value={code}
          placeholder="Enter a code..."
        />
        <button type="submit">Generate</button>
      </form>

      <div id="result" ref={result}></div>
    </div>
  );
}

export default App;
