/**
 * The list of supported options.
 */


import Option from "../models/Option";
import RefOption from "./RefOption";
import NameOption from "./NameOption";
import IdOption from "./IdOption";
import TextOption from "./TextOption";
import HtmlOption from "./HtmlOption";
import TemmeIdsOption from "./TemmeIdsOption";
import TemplatesOption from "./TemplatesOption";
import ClassesOption from "./ClassesOption";
import ChildrenOption from "./ChildrenOption";
import AttributesOption from "./AttributesOption";
import DatasetOption from "./DatasetOption";
import FromOption from "./FromOption";

export const options: Array<Option> = [
    new RefOption(),
    new NameOption(),
    new IdOption(),
    new TextOption(),
    new HtmlOption(),
    new TemmeIdsOption(),
    new TemplatesOption(),
    new ClassesOption(),
    new ChildrenOption(),
    new AttributesOption(),
    new DatasetOption(),
    new FromOption()
];
