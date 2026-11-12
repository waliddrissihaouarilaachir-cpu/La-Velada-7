document.addEventListener('DOMContentLoaded', () => {
  // Compte enrere
  const daysEl = document.getElementById('days');
  if (daysEl) {
    const eventDate = new Date('July 15, 2027 20:00:00').getTime();
    setInterval(() => {
      const now = new Date().getTime();
      const diff = eventDate - now;
      if (diff > 0) {
        document.getElementById('days').innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        document.getElementById('hours').innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        document.getElementById('minutes').innerText = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        document.getElementById('seconds').innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
      }
    }, 1000);
  }

  // Calculadora de preus
  const zoneSelect = document.getElementById('zone');
  const ticketsInput = document.getElementById('tickets');
  const ticketForm = document.getElementById('ticket-form');

  if (zoneSelect && ticketsInput) {
    const calc = () => {
      const price = parseFloat(zoneSelect.value) || 0;
      const qty = parseInt(ticketsInput.value) || 0;
      const subtotal = price * qty;
      const fees = subtotal * 0.10;
      const total = subtotal + fees;
      document.getElementById('subtotal').innerText = subtotal.toFixed(2);
      document.getElementById('fees').innerText = fees.toFixed(2);
      document.getElementById('total-price').innerText = total.toFixed(2);
    };
    zoneSelect.addEventListener('change', calc);
    ticketsInput.addEventListener('input', calc);

    ticketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fullname').value;
      const total = document.getElementById('total-price').innerText;
      const code = 'VEL-' + Math.floor(100000 + Math.random() * 900000);
      document.getElementById('summary-text').innerText = `Gràcies ${name}. Reserva realitzada per ${total} €. Codi: ${code}`;
      document.getElementById('confirmation-msg').classList.remove('hidden');
    });

    document.getElementById('close-btn').addEventListener('click', () => {
      document.getElementById('confirmation-msg').classList.add('hidden');
      ticketForm.reset();
      calc();
    });
  }
});