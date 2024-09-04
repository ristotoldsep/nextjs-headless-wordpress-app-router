import ContactForm from '@/components/ContactForm';

export const metadata = {
    title: 'Contact us',
    description: 'Contact us for more info!',
}

const ContactPage = () => {
  return (
    <>
      <div className="h-[30vh] min-h-[20rem] bg-[url('/bmw-retro.jpg')] bg-cover bg-center relative px-3 pt-[100px]">
          <div className="absolute bg-slate-900 inset-0 z-0 opacity-40 px-3"></div>

          <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8 mt-8">
              Contact
          </h1>

          <p className="relative z-10 text-center text-slate-200 text-2xl">
              Custom form with validation that sends email to Wordpress back-end through CF7 REST API.
          </p>
      </div>

      <main className="px-8 py-12 min-h-[65vh]">
        <div className='max-w-2xl mx-auto'>
          <ContactForm />
        </div>
      </main>
    </>
  )
}

export default ContactPage;