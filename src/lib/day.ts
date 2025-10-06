import dayjs from "dayjs";

import "dayjs/locale/id";

import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

dayjs.locale("id");
dayjs.tz.setDefault("America/New_York");

const day = dayjs;
export default day;
