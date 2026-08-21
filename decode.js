        const toBase64 = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/' ]

        function convert(text) {
            let result = ""
            for (var i = 0; i < text.length; i++) {
                let current = text[i]
                if (current == "=") {
                    break
                }
                let num = toBase64.indexOf(current)
                
                if (num < 0) {
                    throw new Error("Invalid base64 string " + current)
                }

                result += num.toString(2).padStart(6, "0")
            }
            return result
        }
        
        function decode(text, resultNode) {
            const lines = text.split(/\s+/)
            var result = ""

            for (var i = 0; i < lines.length; i++) {
                let base64 = lines[i];

                if (base64 == "") {
                    continue
                }
                
                let firstEquals = base64.indexOf("=")
                let secondEquals = base64.lastIndexOf("=")

                if (firstEquals < 0) {
                    continue
                }
                
                let converted = convert(base64)

                // Two equal chars - last four bits hide the message
                if (firstEquals != secondEquals ) {
                    result += converted.slice(converted.length-4)
                }
                else {
                    result += converted.slice(converted.length-2)
                }
            }
            
            var decoded = ""
            
            for (var y = 0; y < result.length; y+=8) {
                let current = result.slice(y, y+8)
                let num = parseInt(current, 2)

                decoded += String.fromCharCode(num)
            }

            resultNode.innerHTML = decoded
        }

        function decodeBase64(text, resultNode) {
            const lines = text.split(/\s+/)
            
            let result = ""
            for (let i = 0; i < lines.length; i++) {
                result+= (atob(lines[i]) + " ")
            }

            resultNode.innerHTML = result
        }