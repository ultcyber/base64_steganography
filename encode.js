function remaining(secret, text, resultNode) {
    const lines = text.split(/\s+/)
    const numEquals = lines
            .map(s => btoa(s))
            .map(s => (s.match(/=/g) || []).length)
            .reduce((a,b) => a+b, 0)

    const capacityChars = Math.floor((numEquals * 2) / 8)

    const left = capacityChars - secret.length
    resultNode.innerHTML = left.toString()
}


function binaryToBase64(binary) {
    let result = ""
    for (let i = 0; i < binary.length; i += 6) {
        let num = parseInt(binary.slice(i, i + 6), 2)
        // from decode
        result += toBase64[num]
    }
    return result
}

function toBinary(text) {
    let result = ""
    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i)
        if (code > 255) {
            throw new Error("Secret must be Latin characters only: " + text[i])
        }
        result += code.toString(2).padStart(8, "0")
    }
    return result
}

function encode(carrierText, secretText, resultNode) {
    let secretBinary = toBinary(secretText)
    let carrierLines = carrierText.split(/\s+/).filter(s => s != "")

    let result = []

    for (let i = 0; i < carrierLines.length; i++) {
        let base64 = btoa(carrierLines[i])
        let countEquals = (base64.match(/=/g) || []).length

        if (countEquals > 2) {
            throw new Error("Issue when encoding to base64")
        }

        // One '=' hides two bits, two '=' hide four
        if (secretBinary.length > 0 && countEquals > 0) {
            let bitCount = countEquals * 2
            let hidden = secretBinary.slice(0, bitCount).padEnd(bitCount, "0") 
                                                        //padEnd in case secret chunk is shorter than bitcount
            secretBinary = secretBinary.slice(bitCount)

            let binary = convert(base64)
            binary = binary.slice(0, bitCount*-1) + hidden
            base64 = binaryToBase64(binary) + "=".repeat(countEquals)
        }

        result.push(base64)
    }

    resultNode.value = result.join(" ")
}