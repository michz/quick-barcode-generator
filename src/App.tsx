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

  const availableTypes = [
    "qr",
    "code128a",
    "code128b",
    "code128c",
    "code39",
    "ean13",
    "ean8",
    "ean5",
    "ean2",
    "upc",
    "itf14",
    "msi",
    "pharmacode",
    "codabar",
  ];

  async function generateCode() {
    if (!result.current) return;
    if (code.length === 0) return;

    result.current.innerText = '';

    try {
      let svgElement: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      switch (type) {
        case "qr":
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

      if ("data" in matches.args && matches.args["data"].occurrences > 0 && matches.args["data"].value !== null) {
        setCode(matches.args["data"].value.toString())
      }
      if ("type" in matches.args && matches.args["type"].occurrences > 0 && matches.args["type"].value !== null) {
        setType(matches.args["type"].value.toString().toLowerCase())
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
        }}
      >
        <input
          id="code-input"
          ref={inputElement}
          onChange={(e) => setCode(e.currentTarget.value)}
          value={code}
          placeholder="Enter a code..."
          autoComplete="off"
          autoCapitalize="off"
          autoFocus={true}
          autoCorrect="off"
        />
        <select
          name="type"
          onChange={(e) => setType(e.currentTarget.value)}
          value={type}
        >
          { availableTypes.map(t => {
            return (
              <option key={ t } value={ t }>{ t }</option>
            )
          }) }
        </select>
      </form>

      <div id="result" ref={result}></div>
      {(error) && <div id="error">{ error }</div>}
    </div>
  );
}

export default App;
