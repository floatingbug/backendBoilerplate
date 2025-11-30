function response(res, {success, code, message = "", errors = [], data = {}}){
	if(success){
		return res.status(code).
			json({
				success,
				message,
				data,
			});
	}
	else{
		res.status(code).
			json({
				success,
				errors
			});
	}
}


module.exports = response;
