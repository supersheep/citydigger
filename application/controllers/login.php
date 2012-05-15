<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

	public function index()
	{
		$this->load->helper('url');
		$this->load->library('session');
		$this->load->model('user');
		//$this->load->helper('cookie');
		$this->data['logged'] = $this->user->logged();
		
		$email = $this->input->post('email');
		$pwd = $this->input->post('password');
		
		$login = $this->user->login($email,$pwd);
		if($login == 1){
			redirect('/');
		}else if($login == 2){
			redirect('user/info');
		}else if($this->input->post()){
			$this->data['error'] = "用户不存在或密码错误";
		}else{
			$this->data['error'] = "";
		}
		
		$this->data['title'] = "登录";
		
		$this->load->view('frag/header',$this->data);
		$this->load->view('pages/login',$this->data);
	}
}
	