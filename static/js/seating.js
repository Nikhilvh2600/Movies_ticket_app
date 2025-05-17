
document.addEventListener('DOMContentLoaded', () => {
    const seatsContainer = document.querySelectorAll('.seat');
    const selectedSeatsInput = document.getElementById('selectedSeatsInput');
    const selectedSeatsDisplay = document.getElementById('selectedDisplay');
    const payButton = document.getElementById('payButton');
    const totalAmountInput = document.getElementById('total_amount');
    const totalSeatsEl = document.getElementById('totalSeats');
    const totalAmountEl = document.getElementById('totalAmount');

    let selectedSeats = [];
    let totalPrice = 0;

    // Add staggered animation to seat rows
    document.querySelectorAll('.seat-row').forEach((row, index) => {
        row.style.animationDelay = `${index * 100}ms`;
    });

    // Add click animation
    const addClickEffect = (element) => {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    };

    seatsContainer.forEach(seat => {
        // Add hover effect with scale transform
        seat.addEventListener('mouseenter', () => {
            if (!seat.classList.contains('unavailable')) {
                seat.style.transform = 'translateY(-5px) scale(1.05)';
            }
        });
        
        seat.addEventListener('mouseleave', () => {
            if (!seat.classList.contains('unavailable') && !seat.classList.contains('selected')) {
                seat.style.transform = '';
            } else if (seat.classList.contains('selected')) {
                seat.style.transform = 'translateY(-5px)';
            }
        });

        seat.addEventListener('click', () => {
            if (seat.classList.contains('unavailable')) return;

            const seatId = seat.dataset.seatId;
            const row = seat.dataset.rowLabel;
            const number = seat.dataset.seatNumber;
            const price = parseInt(seat.dataset.price, 10);

            const seatCode = `${row}${number}`;
            const existingIndex = selectedSeats.findIndex(s => s.key === seatCode);

            // Add click animation
            if (!seat.classList.contains('unavailable')) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                seat.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 800);
            }

            if (existingIndex > -1) {
                seat.classList.remove('selected');
                selectedSeats.splice(existingIndex, 1);
                totalPrice -= price;
                seat.style.transform = '';
            } else {
                seat.classList.add('selected');
                selectedSeats.push({
                    id: seatId,
                    row: row,
                    number: number,
                    price: price,
                    seatCode: seatCode,
                    key: seatCode
                });
                totalPrice += price;
                seat.style.transform = 'translateY(-5px)';
            }

            // Sort seats for display
            selectedSeats.sort((a, b) => {
                if (a.row === b.row) return a.number - b.number;
                return a.row.localeCompare(b.row);
            });

            selectedSeatsInput.value = JSON.stringify(selectedSeats);
            totalAmountInput.value = totalPrice;

            // Update display areas
            const seatList = selectedSeats.map(s => s.seatCode).join(', ') || 'None';
            selectedSeatsDisplay.innerText = `Selected Seats: ${seatList}`;
            selectedSeatsDisplay.style.borderLeftColor = selectedSeats.length > 0 ? '#00ffc3' : 'var(--primary)';
            
            totalSeatsEl.innerText = selectedSeats.length;
            totalAmountEl.innerText = `₹${totalPrice}`;
            payButton.innerText = selectedSeats.length > 0 ? `Pay ₹${totalPrice}` : 'Select Seats';
            
            // Disable/enable pay button based on selection
            if (selectedSeats.length > 0) {
                payButton.disabled = false;
                payButton.style.opacity = 1;
            } else {
                payButton.disabled = true;
                payButton.style.opacity = 0.7;
            }
        });
    });

    // Initialize pay button state
    payButton.disabled = true;
    payButton.style.opacity = 0.7;
});
