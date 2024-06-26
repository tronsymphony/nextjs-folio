import Link from "next/link";
import Image from "next/image";

export default function HomePricing() {
  return (
    <section
      className="home_pricing"
      data-scroll-section
      data-scroll-section-id="20"
    >
      <div className="container">
        <figure>
          <Image
            loading="lazy"
            alt="Crafting Digital Magic in the Heart of Los Angeles"
            width="700"
            height="700"
            className="img-fluid lazyloaded"
            decoding="async"
            data-scroll=""
            data-scroll-speed="3"
            src="https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          ></Image>
        </figure>
        <div className="content">
          <h2 className="title ">
            $0 Down, as little as $150 Per Month, 12 Month Minimum Contract
          </h2>
          <p class="ptitle">
            At Casa Dev, we are dedicated to delivering tailored, hand-coded
            website solutions from our base in Los Angeles. We specialize in
            crafting business websites that not only look stunning but also
            perform seamlessly to drive your business growth. Our standard
            package offers a comprehensive 5-page website at no initial cost.
            Should your project require more extensive features, we provide
            custom pricing based on the scope of work, including additional
            pages and the intricacies of the development process.
          </p>
          <div className="we-text">
            <Link href="/contact/" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
