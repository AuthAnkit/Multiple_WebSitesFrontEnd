const menuUrl = 'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json';

async function getMenu() {
  try {
    const response = await fetch(menuUrl);
    if (!response.ok) throw new Error('Failed to fetch menu');
    const data = await response.json();

    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';

    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';

      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="card-content">
          <h3>${item.name}</h3>
          <p>${item.dsc}</p>
          <p class="price">$${item.price.toFixed(2)}</p>
        </div>
      `;

      menuContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    document.getElementById('menu-items').innerHTML = '<p style="text-align:center; color:red;">Sorry, menu unavailable at the moment.</p>';
  }
}

function TakeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const possibleBurgers = [
        'Classic Burger', 'Cheese Burger', 'Bacon Burger', 
        'Veggie Burger', 'Chicken Burger', 'Double Cheeseburger'
      ];
      const order = [];
      const available = [...possibleBurgers];
      
      for (let i = 0; i < 3; i++) {
        const idx = Math.floor(Math.random() * available.length);
        order.push(available[idx]);
        available.splice(idx, 1);
      }
      resolve({ burgers: order });
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  const thankYou = document.getElementById('thank-you');
  thankYou.style.display = 'block';
  setTimeout(() => {
    thankYou.style.display = 'none';
  }, 3000);
}

// Event Listeners
document.getElementById('order-btn').addEventListener('click', () => {
  document.getElementById('menu-section').style.display = 'none';
  document.getElementById('table-section').style.display = 'block';

  TakeOrder()
    .then((orderData) => {
      const items = orderData.burgers.join(', ');
      document.getElementById('order-details').innerText = `Ordered: ${items}`;
      document.getElementById('status').innerText = 'Order Status: Preparing';
      return orderPrep();
    })
    .then((prepData) => {
      console.log('Preparation:', prepData);
      document.getElementById('status').innerText = 'Order Status: Ready';
      return payOrder();
    })
    .then((payData) => {
      console.log('Payment:', payData);
      document.getElementById('status').innerText = 'Order Status: Paid';
      thankyouFnc();
    })
    .catch((error) => {
      console.error('Order error:', error);
      alert('Something went wrong with your order. Please try again.');
    });
});

getMenu();