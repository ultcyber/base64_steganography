# Base64 Steganography

inspired by [Hexarcana](https://hexarcana.ch/b/2024-08-16-base64-beyond-encoding/)

Simple project presenting steganography using base64.

Handwritten (besides styling)

## Key idea

Base64 encoding transforms 8-bit char numbers into 6-bit numbers - this leaves room potential for a remainer of the last 8-bit character to fit less to less than 6 bits. 6-bit leftovers are padded with =, however if the last char before the padding does not occupy the full 6-bit space (char is 2 or 4 bits), the remaining bytes are unused and should (normally) be zeroed, but most encoders just ignore them.

For more details, follow the link to Hexarcana above.

## Test yourself

Open any webrowser console

```javascript
atob("AA==") // outputs "\u0000"
atob("AB==") // also outputs "\u0000" (B char is not read)
```

## Try it

Hosted on Github Pages: [Base64 Steganography](https://ultcyber.github.io/base64_steganography/)