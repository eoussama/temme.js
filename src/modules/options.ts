/**
 * The list of supported options.
 */


import Option from "./models/Option";
import RefOption from "./options/RefOption";
import NameOption from "./options/NameOption";
import IdOption from "./options/IdOption";
import TextOption from "./options/TextOption";
import HtmlOption from "./options/HtmlOption";
import TemmeIdsOption from "./options/TemmeIdsOption";
import TemplatesOption from "./options/TemplatesOption";
import ClassesOption from "./options/ClassesOption";
import ChildrenOption from "./options/ChildrenOption";
import AttributesOption from "./options/AttributesOption";
import DatasetOption from "./options/DatasetOption";
import FromOption from "./options/FromOption";

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
