<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ajax extends CI_Controller {

	public function user($type)
	{	
		parse_str($_SERVER['QUERY_STRING'],$_GET);
		
		$this->load->model('user');
		
		if($type == "fresh"){
			$this->freshUser($this->input->get('from'),$this->input->get('to'));
		}else if($type == "search"){
			$this->searchUser($this->input->get('keyword'),$this->input->get('from'),$this->input->get('to'));
		}
	}
	
	private function errorMsg($msg){
	
		echo json_encode(array(
			'code'=>500,
			'msg'=>$msg
		));
	}
	
	private function success($result){
		echo json_encode(array(
			'code'=>200,
			'msg'=>$result
		));
	}
	
	private function searchUser($keyword,$from,$to){
		
		if($keyword!==false && $from!==false && $to!==false){
			$result = $this->user->search($keyword,$from,$to);
			$this->success($result);
		}else{
			$this->errorMsg("bad args");
		}
	}
	
	private function freshUser($from,$to){
		
		if($from!==false && $to!==false){
			echo "dosth";
		}else{
			$this->errorMsg("bad args");
		}
		
	}
	
}
	