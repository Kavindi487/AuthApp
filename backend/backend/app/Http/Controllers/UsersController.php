<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function register(Request $request)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|max:12',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Generate JWT token
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User Registered',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        // Validate request data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8|max:12',
        ]);

       $user = User::where('email', $request->email)->first();

       if($user){
        return response()->json([
            'error' => 'Invalid Email'], 401);
       }
       elseif(!Hash::check($request->password, $user->password)){
        return response()->json([
            'error' => 'Invalid Password'], 401);
         }


        // Generate JWT token
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User Registered',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function dashboard(Request $request)
    {
        // Validate request data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8|max:12',
        ]);

       $user = User::where('email', $request->email)->first();

       if($user){
        return response()->json([
            'error' => 'Invalid Email'], 401);
       }
       elseif(!Hash::check($request->password, $user->password)){
        return response()->json([
            'error' => 'Invalid Password'], 401);
         }


        // Generate JWT token
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User Registered',
            'user' => $user,
            'token' => $token
        ], 201);
    }

}
