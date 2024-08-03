import React from 'react'
import { BiBell, BiCard, BiCreditCard, BiGlobe, BiHeadphone, BiUserCheck } from 'react-icons/bi'
import {FaUserGear } from 'react-icons/fa6'
import './account.scss'
import lebanon from '../../../assets/images/Flag_of_Lebanon.svg.webp'
import usa from '../../../assets/images/United_States.png'
import { BsCardText, BsHeadset, BsInfoCircle, BsQuestionCircle, BsTag } from 'react-icons/bs'
import { FiGift } from 'react-icons/fi'
import { RiDiscountPercentLine } from 'react-icons/ri'
import { GrLocationPin } from 'react-icons/gr'
import { GoHeart } from 'react-icons/go'
import { LuMessageSquareDashed } from 'react-icons/lu'
import { PiGavelLight } from 'react-icons/pi'

const MyAccount = () => {
  return (
    <>
      <div className="header">
        <h1>Fatima AliAhmad</h1>
      </div>
      <div className="flex-1">

        <div className='card'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex flex-column align-items-center gap-2'>
              <div className='icon'>
                <FaUserGear />
              </div>
              <span>Profile</span>
            </div>
            <div className='d-flex flex-column align-items-center gap-2'>
              <div className='icon'>
                <BiHeadphone />
              </div>
              <span>Support</span>
            </div>
            <div className='d-flex flex-column align-items-center gap-2'>

              <div className='icon'>
                <BiCreditCard />
              </div>
              <span>Payments</span>
            </div>
            <div className='d-flex flex-column align-items-center gap-2'>
              <div className='icon'>
                <BiGlobe />
              </div>
              <span>Language</span>
            </div>
          </div>
        </div>
        
        <div className='card'>
          <h3 className='card-title'>ShopiiShop Cash <BsInfoCircle className='text-primary'/></h3>
          <ul className='list'>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <img src={lebanon} alt="" />
                </div>
                <span>Profile</span>
                <span className='ml-auto text-primary bold'>LBP 0</span>
              </div>
            <hr/>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <img src={usa} alt="" />
                </div>
                <span>Support</span>
                <span className='ml-auto text-primary bold'>USD 0.00</span>
              </div>
          </ul>
        </div>
        
        <div className='card'>
          <h3 className='card-title'>Promotions</h3>
          <ul className='list'>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <RiDiscountPercentLine />
                </div>
                <span>Credits</span>
                <span className='ml-auto text-primary bold'>LBP 0</span>
              </div>
            <hr/>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <FiGift />
                </div>
                <span>Store Rewards</span>
              </div>
            <hr/>
              <div className='d-flex align-items-center gap-2'>

                <div className='icon1'>
                  <BsTag />
                </div>
                <span>Add Promo Code</span>
              </div>
          </ul>
        </div>
        
        <div className='card'>
          <h3 className='card-title'>Account Details</h3>
          <ul className='list'>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <BiBell />
                </div>
                <span>Notifications</span>
              </div>
            <hr/>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <GrLocationPin />
                </div>
                <span>Adresses</span>
              </div>
            <hr/>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <GoHeart />
                </div>
                <span>Favorites</span>
              </div>
            <hr/>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <BsCardText/>
                </div>
                <span>Preferences</span>
              </div>
            <hr/>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <BiUserCheck/>
                </div>
                <span>Refer a friend</span>
              </div>
          </ul>
        </div>  
        <div className='card'>
          <h3 className='card-title'>Help Center</h3>
          <ul className='list'>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <BsHeadset />
                </div>
                <span>Get Support</span>
              </div>
            <hr/>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <LuMessageSquareDashed />
                </div>
                <span>Support Tickets</span>
              </div>
            <hr/>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <PiGavelLight />
                </div>
                <span>Legal</span>
              </div>
            <hr/>
              <div className='d-flex align-items-center gap-2'>
                <div className='icon1'>
                  <BsQuestionCircle/>
                </div>
                <span>FAQ</span>
              </div>
          </ul>
        </div>
      </div>
    </>
  )
}

export default MyAccount