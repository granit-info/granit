import PriceArtwork from "./PriceArtwork";
import PriceBackside from "./PriceBackside";
import PriceCross from "./PriceCross";
import PriceCutout from "./PriceCutout";
import PriceFacet from "./PriceFacet";
import PriceFioFormat from "./PriceFioFormat";
import PriceKopir from "./PriceKopir";
import PricePhotoglassFormat from "./PricePhotoglassFormat";
import PricePhotokeramFormat from "./PricePhotokeramFormat";
import PricePoem from "./PricePoem";
import PriceSmall from "./PriceSmall";


const PricesPage = () => {
  return (
    <div>
    <PriceSmall />
    <PriceFacet />
    <PriceKopir />
    <PricePoem />
    <PriceBackside />
    <PriceCutout />
    <PriceArtwork />
    <PriceFioFormat />
    <PriceCross />
    <PricePhotoglassFormat />
    <PricePhotokeramFormat />
    </div>
  );
};

export default PricesPage;
