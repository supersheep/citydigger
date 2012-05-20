<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

	public function index()
	{
		$this->load->helper('url');
		$this->load->library('session');
		$this->load->model('user');
		//$this->load->helper('cookie');
		$logged = $this->user->logged();
		$this->data['logged'] = $logged;
		
		$email = $this->input->post('email');
		$password = $this->input->post('password');
		
		
		
		//　若登录成功
		
		if(isset($email) && isset($password)){
		
			
			$login = $this->user->login($email,$password);
		
			if($login == 1 || $logged){
				redirect('/');
			}else{
				
				if($login == -1){
					$this->data['error'] = "Email doesn't exist";
				}else if($login == -2){
					$this->data['error'] = "Password error";
				}
				
			}
		}
		
		$this->data['title'] = "CityDigger - Login";
		
		$this->load->view('frag/header',$this->data);
		$this->load->view('pages/login',$this->data);
	}
}
	