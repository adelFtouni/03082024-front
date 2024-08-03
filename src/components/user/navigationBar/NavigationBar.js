import { useState } from 'react';
import './NavigationBar.scss'
import ItemsList from '../itemsList/ItemsList';
import StoresList from '../storesList/StoresList';
function NavigationBar() {
  const stores = [
    { id: '1', image: '/images/food1.png', title: 'Item 2', description: 'Description 2', rating: 3},
    { id: '3', image: '/images/food5.png', title: 'Item 2', description: 'Description 2', rating: 3},
  ];  const items = [
    { id: '1', image: '/images/food1.png', title: 'Item 2', description: 'Description 2', rating: 3, time: '1 hour', extraElements: ['15% off up to 100,000 LBP', 'Free delivery'] },
    { id: '2', image: '/images/food3.png', title: 'Item 2', description: 'Description 2', rating: 3, time: '1 hour', extraElements: ['15% off up to 2,000,000 LBP', 'Free delivery'] },
    { id: '3', image: '/images/food5.png', title: 'Item 2', description: 'Description 2', rating: 3, time: '1 hour', extraElements: ['Extra 1'] },
  ];
  const tabs = [
    {
      title: "Stores",
      content: <div className='stores'>
        <StoresList items={stores} /></div>
    },
    {
      title: "Items",
      content: <div className='items'>
        <ItemsList items={items} /></div>
    }
  ]
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="tab-list">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={index === activeTab ? "tab-item active" : "tab-item"}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

export default NavigationBar;
