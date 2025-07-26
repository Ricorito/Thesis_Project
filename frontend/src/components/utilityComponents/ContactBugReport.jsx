import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const ContactBugReport = () => {
  const formRef = useRef();
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_h04vbqg",
        "template_qa9g2rr",
        formRef.current,
        "cOrYSzato_y3qF8bX"
      )
      .then(
        () => {
          setStatus("success");
          formRef.current.reset();
        },
        () => {
          setStatus("error");
        }
      );
  };

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <motion.section
      id="contact"
      className="max-w-2xl mx-auto px-6 py-5 text-center"
      data-aos="fade-up"
    >
      <Separator className="mb-10 border-t border-sand" />
      <h2 className="text-2xl font-bold text-teal-600 mb-4">
        Found a bug or have a feature idea?
      </h2>
      <p className="text-gray-600">
        If you’ve noticed a <b>bug</b>, have a <b>suggestion</b>, or just want
        to share your <b>thoughts</b>
      </p>
      <p className="text-gray-600">
          whether it’s about a <b>feature idea</b> or you want to appreciate the <b>time</b> and <b>effort</b> I’ve put into this project
      </p>
      <p className="text-gray-600 mb-8">
        feel free to <b>contact</b> me directly.
      </p>
      <p className="text-gray-600 ">
        I truly <b>appreciate</b> your feedback. 😊
      </p>
      <p className="text-gray-600 text-xs italic mb-6">
        - Martin Germán
      </p>

      <form ref={formRef} onSubmit={sendEmail} className="space-y-6 text-left">
        <div className="space-y-1">
          <label
            htmlFor="user_name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            id="user_name"
            type="text"
            name="user_name"
            placeholder="Your name"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="user_email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            id="user_email"
            type="email"
            name="user_email"
            placeholder="Your email"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <Input
            id="subject"
            type="text"
            name="subject"
            placeholder="Bug title or topic"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Message here..."
            rows={5}
            required
          />
        </div>

        <Button
          type="submit"
          className="bg-darkblue hover:bg-teal-700 text-white"
        >
          {status === "sending" ? "Sending..." : "Send Report"}
        </Button>

        {status === "success" && (
          <p className="text-sm text-green-600 mt-2">
            Thank you for your feedback! 😊
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600 mt-2">
            Something went wrong. Try again later.
          </p>
        )}
      </form>
    </motion.section>
  );
};

export default ContactBugReport;
