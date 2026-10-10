const Footer = () => {
return ( <footer className="mt-auto w-full border-t border-gray-100 bg-white"> <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:text-left lg:px-8"> <p className="text-sm text-gray-600 sm:text-base">
🛒{" "} <span className="font-bold text-[#0fa958]">বাজার দর</span>
{" "}— প্রয়োজনীয় পণ্যের দাম এক নজরে। </p>

    <p className="text-xs leading-6 text-gray-400 sm:text-sm">
      সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
    </p>
  </div>
</footer>


);
};

export default Footer;
