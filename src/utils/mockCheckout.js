// Simulates a payment request. Always succeeds after a short delay unless
// the card number is the obviously-fake "0000 0000 0000 0000" test case,
// which is here just to demonstrate what an error state looks like.

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function processPayment({ cardNumber }) {
  await delay(900)
  const digitsOnly = cardNumber.replace(/\s/g, '')
  if (digitsOnly === '0000000000000000') {
    throw new Error('Your card was declined. Try a different card.')
  }
  return { confirmationId: `SH-${Math.floor(100000 + Math.random() * 900000)}` }
}