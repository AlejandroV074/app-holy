import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

import './style.css'

function QRScanner() {
    const [scanResult, setScanResult] = useState(null);
    const scannerRef = useRef(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const codeParam = urlParams.get("code");

        if (codeParam) {
            window.location.href = `/trazabilidad?code=${codeParam}`;
            return;
        }

        if (!scannerRef.current) {
            scannerRef.current = new Html5QrcodeScanner("reader", {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 5,
                rememberLastUsedCamera: true,
            });

            scannerRef.current.render(success, error);
        }

        function success(result) {
            console.log(result);
            scannerRef.current.clear();

            const searchIndex = result.indexOf("code=");

            if (searchIndex !== -1) {
                const codeWithPrefix = result.substring(searchIndex);

                const code = codeWithPrefix.replace("code=", "");
                
                window.location.href = `/trazabilidad?code=${code}`;
                
                setScanResult(code);
            } else {
                console.warn("El formato de la URL no es el esperado.");
                document.getElementById('html5-qrcode-button-camera-stop').click()
            }
        }

        function error(err) {
            console.warn(err);
        }
    }, []);

    useEffect(() => {
        if (scanResult) {
            document.getElementById('html5-qrcode-button-camera-stop')?.click()
        }
    }, [scanResult])
    

    return (
        <div className="visible-class">
            { scanResult 
                    ? <div style={{color: '#d4af37', fontWeight: 'bold'}}>Redireccionando...</div> 
                    : null
            }
            <div id="reader" className={ scanResult ? "hidden" : "" }></div>
        </div>
    );
}

export default QRScanner;
