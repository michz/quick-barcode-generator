import { useEffect, useRef, useState } from "react";
//import { invoke } from "@tauri-apps/api/tauri";
import { getMatches } from '@tauri-apps/api/cli'

import { BrowserQRCodeSvgWriter } from "@zxing/browser";
import JsBarcode from 'jsbarcode';


function App() {
  const [code, setCode] = useState("");
  const [type, setType] = useState("qr");
  const [error, setError] = useState("");
  const inputElement = useRef<HTMLInputElement>(null)
  const result = useRef<HTMLDivElement>(null)

  async function generateCode() {
    if (!result.current) return;
    if (code.length === 0) return;

    result.current.innerText = '';

    try {
      let svgElement: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      switch (type) {
        case "QR":
          const codeWriter = new BrowserQRCodeSvgWriter()
          svgElement = codeWriter.write(code, 400, 400)
          break;

        default:
          JsBarcode(svgElement, code, {
            format: type,
            xmlDocument: document,
          });

          console.log(svgElement);
          break;
      }

      svgElement.setAttribute("width", "100%")
      svgElement.setAttribute("height", "100%")
      result.current.append(svgElement)
      setError("")
    } catch (e: any) {
        setError(e.toString())
    }
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
  }, [code, type])

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
        <select
          name="type"
          onChange={(e) => setType(e.currentTarget.value)}
          value={type}
        >
          <option>QR</option>
          <option>CODE128A</option>
          <option>CODE128B</option>
          <option>CODE128C</option>
          <option>CODE39</option>
          <option>EAN13</option>
          <option>EAN8</option>
          <option>EAN5</option>
          <option>EAN2</option>
          <option>UPC</option>
          <option>ITF14</option>
          <option>MSI</option>
          <option>pharmacode</option>
          <option>codabar</option>
        </select>
      </form>

      <div id="result" ref={result}></div>
      {(error) && <div id="error">{ error }</div>}
    </div>
  );
}

export default App;
