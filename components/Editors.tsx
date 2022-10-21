import Editor from "@monaco-editor/react";
import { ClipLoader as Loader } from "react-spinners";
import { useState } from 'react';

const availableLanguages = ["python", "javascript"];

const Editors = () => {
    const [code, setCode] = useState<string | undefined>("");
    const [input, setInput] = useState<string | undefined>("");
    const [answer, setAnswer] = useState<string | undefined>("");
    const [currentLang, setCurrentLang] = useState<string>("python");
    const handleEditorDidMount = (value: string | undefined) => {
        setCode(value);
    }
    const fetchRes = async () => {
       const { response } = await fetch(`/api/language/${currentLang}`, {method:"POST", body: JSON.stringify({code, input})}).then(res => res.json())
        setAnswer(response?.output || "")
    }
    const handleInput = (value: string | undefined) => {
        setInput(value);
    }
    return (
        <>
            <section className="flex w-full m-1 gap-2">
                <select onChange={(e)=> setCurrentLang(e.target.value)}>
                    {availableLanguages?.map((language, idx) => <option key={idx} value={language}>{language.toLocaleUpperCase()}</option>)}
                </select>
                <button className="bg-green-500 text-white" onClick={fetchRes}>Run</button>
            </section>
            <section className='w-full grid grid-cols-1 md:grid-cols-2 gap-2' style={{height: "80vh"}}>
                <Editor
                    theme="vs-dark"
                    language={currentLang}
                    height={"100%"}
                    loading={<Loader />}
                    value={code}
                    onChange={handleEditorDidMount}
                />
                <section className="grid grid-rows-2 gap-1">
                    <section>
                        <Editor
                            theme="vs-dark"
                            height={"100%"}
                            language="text"
                            loading={<Loader />}
                            value={input}
                            onChange={handleInput}
                        />
                    </section>
                    <section>
                        <Editor
                            theme="vs-dark"
                            height={"100%"}
                            options= {{
                                readOnly: true
                            }}
                            language="text"
                            loading={<Loader />}
                            value={answer}
                        />
                    </section>
                </section>
            </section>
        </>
    )

}

export default Editors;