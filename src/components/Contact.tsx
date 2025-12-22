import React, { useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import type { Hero } from '../types/profile';

interface ContactProps {
  myContact?: Hero;
}

const Contact: React.FC<ContactProps> = ({ myContact }) => {
  
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut"
      },
    }),
  };

  const formRef = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs.sendForm(
      'service_iqacdve',
      'template_e5p5a1f',
      formRef.current,
      'Mnh7QqDg3V880DDZu'
    ).then(
      (result) => {
        console.log('SUCCESS!', result.text);
        // Show success toast notification
        toast.success('Your message has been sent successfully!', {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        formRef.current?.reset();
      },
      (error) => {
        console.log('FAILED...', error.text);
        toast.error('Something went wrong. Please try again later.', {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    );
  };

  return (
    <motion.div
      className="about mt-20 -mb-5 flex-col justify-center text-center bg-[var(--surface)]/50 text-[var(--text)]"
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h1 className="text-3xl text-center font-bold p-5">Connect with me!</h1>

      <motion.div
        className="contact-info mt-10 space-y-4"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* WhatsApp */}
        <div className="flex justify-center items-center gap-1 mt-2">
          <img src="/whatsapp.svg" className="invert w-[1.5rem]" width="100%" height="100%" alt="whatsapp" />
          <span>:</span>
          <a href={`https://wa.me/${myContact?.phone}`} className="opacity-80 text-lg flex items-center gap-1">
            <span>{myContact?.phone}</span>
            <img src="/link.svg" className="invert w-[1.1rem] ml-1" width="100%" height="100%" alt="link" />
          </a>
        </div>

        {/* Email */}
        <div className="flex justify-center items-center gap-1 mt-2">
          <img src="/email.svg" className="invert w-[1.5rem]" width="100%" height="100%" alt="email" />
          <span>:</span>
          <a href={`mailto:${myContact?.email}`} className="opacity-80 text-lg">
            {myContact?.email}
          </a>
          <img src="/link.svg" className="invert w-[1.1rem] ml-1" width="100%" height="100%" alt="link" />
        </div>
      </motion.div>

      <div className="w-[8rem] h-1 bg-[var(--primary)] mx-auto rounded mt-10"></div>

      <motion.form
        id="form"
        className="space-y-2 md:space-x-5 p-10"
        ref={formRef}
        onSubmit={sendEmail}
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Name */}
        <div className="text-left md:w-1/5 mx-auto">
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            id="name"
            name="from_name"
            type="text"
            required
            placeholder="Your name"
            className="w-full p-2 rounded-md bg-[var(--primary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        {/* Email */}
        <div className="text-left md:w-1/5 mx-auto">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            name="reply_to"
            type="email"
            required
            placeholder="Your email"
            className="w-full p-2 rounded-md bg-[var(--primary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        {/* Message */}
        <div className="text-left md:w-1/5 mx-auto">
          <label htmlFor="message" className="block mb-1 font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Your message"
            className="w-full p-3 rounded-md resize-none bg-[var(--primary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-[var(--primary)] hover:bg-[var(--primary-soft)] rounded-md transition"
          >
            Send
          </button>
        </div>
      </motion.form>

      {/* Toast notifications container */}
      <ToastContainer />
    </motion.div>
  );
};

export default Contact;
