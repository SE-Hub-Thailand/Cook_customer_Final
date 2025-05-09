export const convertDateTime = (date, time) => {
	const dateTime = new Date(`${date}T${time}`);

	const dayNames = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
	const monthNames = [
	  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
	  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
	];

	const dayName = dayNames[dateTime.getDay()];
	const day = dateTime.getDate();
	const monthName = monthNames[dateTime.getMonth()];
	const yearBE = dateTime.getFullYear() + 543;

	const hours = dateTime.getHours().toString().padStart(2, '0');
	const minutes = dateTime.getMinutes().toString().padStart(2, '0');

	return `วัน${dayName}ที่ ${day} เดือน ${monthName} ${yearBE} เวลา ${hours}:${minutes} น.`;
  };
